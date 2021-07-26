import { RaideaService } from 'raidea_module/raidea.service';
import { HttpStatus } from '@nestjs/common';
import { MapManager } from './util/map.manager';
import { CalculateManager } from './util/calculate.manager';
import { PhoneNumberUtil } from 'google-libphonenumber';
import * as jwtDecode from 'jwt-decode';
import moment = require('moment');

import * as ModelDto from './dto/model.dto';
import * as OrdersDTO from './dto/orders.dto';
import checkParams from 'app/util/check.params';
import makePaymentMethod from './util/make.paymentMethod';

const phoneUtil = PhoneNumberUtil.getInstance();

export class EmailService {
  constructor(
    private raideaService: RaideaService,
    private mapManager: MapManager,
    private calculateManager: CalculateManager,
  ) {}

  async getOrderStatement(
    accessToken: string,
    orderId: string,
    isSend = false,
  ): Promise<ModelDto.ResponseDto> {
    const result = new ModelDto.ResponseDto();

    try {
      //필수 파라미터 체크
      const initCheck = checkParams({ orderId });
      if (initCheck) {
        return new ModelDto.ResponseDto(
          HttpStatus.BAD_REQUEST,
          `No ${initCheck}`,
        );
      }

      const corpId = await this.raideaService.userService.getCorpId(
        accessToken,
      );

      const booking = await this.raideaService.bookingService.getBooking(
        orderId,
        accessToken,
      );

      //예약 데이터요청
      const member = await this.raideaService.userService.getMember(
        booking.memberUuid,
        accessToken,
      );

      //유저 정보 조회
      const user = await this.raideaService.authService.getUser(
        member.userUuid,
        accessToken,
      );

      const [car] = await this.raideaService.objectService.getObjectsById(
        { objectType: '1', objid: booking.objectUuid },
        accessToken,
      );

      const supplier = await this.raideaService.supplierService.getSupplier(
        {
          supplierId: car.objSupplierId,
        },
        accessToken,
      );

      const supplierDto = new OrdersDTO.SupplierDTO();

      supplierDto.companyName = supplier.supplierName || '';
      supplierDto.representativeName = supplier.representativeName || '';
      supplierDto.representativeTel = supplier.representativeTel || '';
      supplierDto.taxPayerId = supplier.taxPayerId || '';
      supplierDto.sellersPermit = supplier.sellersPermit || '';
      supplierDto.address = supplier.address || '';
      supplierDto.detailAddress = supplier.detailAddress || '';

      //결제 데이터요청
      const charges = await this.raideaService.chargeService.getChargeBills(
        {
          split: 1,
          chargeStatus: '2,5,6,7',
          bookingNo: orderId,
          orderBy: 'initDate:1',
        },
        accessToken,
      );

      const billsMap = new Map();

      await Promise.all(
        charges.data.map(async (charge) => {
          const bill = charge.bill[0];

          const card = await this.raideaService.cardService.getCard(
            {
              ownerId:
                charge?.paymentMethod ===
                this.raideaService.ENUM.PaymentMethod.GROUP_CARD
                  ? corpId
                  : bill?.memberUuid || booking?.memberUuid || corpId,
              cardId: bill?.cardId || charge?.cardId,
            },
            accessToken,
          );

          if (bill) {
            billsMap.set(bill?.billNo, {
              chargeItem: bill?.chargeItemList.map((item) => item.chargeItem),
              amount: bill?.cancelAmount
                ? `-${bill?.cancelAmount}`
                : bill?.amount,
              cancelAmount: bill?.cancelAmount,
              card: makePaymentMethod(charge?.paymentMethod, card),
              pgTid: bill?.pgTid,
              paidAt: bill?.paidAt || bill?.initDate || '',
            });
          }
        }),
      );

      const bills = [...billsMap.values()];

      // 운행 관련
      let googleMapImageUrl, drivingDistance, drivingLocations;
      if (
        booking.bookingStatus !== this.raideaService.ENUM.BookingStatus.CANCELED
      ) {
        const terminal = await this.raideaService.deviceService.getTerminals(
          { objectUuid: booking.objectUuid },
          accessToken,
        );

        const staticMapDTO = { coordinates: [], stationH3Idx: 0 };
        const startTime = moment.unix(
          booking.objCtrlStartDt || booking.bookingStartDt,
        );
        const endTime = moment.unix(
          booking.returnCompleteDt || booking.bookingEndDt,
        );
        const objectDriveGeoArray =
          await this.raideaService.drivingService.getDrivingInfo(
            {
              terminalId: terminal?.[0]?.terminalId,
              searchStartYmd: startTime.utc().format('yyyyMMDD'),
              searchStartHour: startTime.utc().format('HH'),
              searchStartMin: startTime.utc().format('mm'),
              searchEndYmd: endTime.utc().format('yyyyMMDD'),
              searchEndHour: endTime.utc().format('HH'),
              searchEndMin: endTime.utc().format('mm'),
            },
            accessToken,
          );

        objectDriveGeoArray.forEach((item) => {
          staticMapDTO.coordinates.push({
            longitude: item.longitude,
            latitude: item.latitude,
          });
        });

        const station = await this.raideaService.stationService.getStation(
          booking.fromStationId,
          accessToken,
        );

        const stationH3Idx = station.zone?.h3Idx;
        const geo = await this.raideaService.stationService.getH3toGeo(
          stationH3Idx,
          accessToken,
        );

        const googleMapImageBuffer =
          await this.mapManager.getStaticMapImageToBlob({
            ...staticMapDTO,
            stationH3Idx: [geo.lat, geo.lng],
          });

        const [googleMapImageId] =
          await this.raideaService.imageService.postUpload(
            [
              {
                buffer: googleMapImageBuffer,
                originalname: `${moment().unix()}_invoice_googlemap.png`,
              },
            ],
            accessToken,
          );

        googleMapImageUrl = `${
          process.env.RAIDEA_API_URL
        }${await this.raideaService.imageService.getImageUrlForDuration(
          googleMapImageId,
          isSend ? 180 * 24 * 60 * 60 : 60 * 60,
        )}`;

        try {
          drivingDistance =
            await this.raideaService.drivingService.getDrivingDistance(
              {
                terminalId: terminal?.[0]?.terminalId,
                searchStartYmd: startTime.utc().format('yyyyMMDD'),
                searchStartHour: startTime.utc().format('HH'),
                searchStartMin: startTime.utc().format('mm'),
                searchEndYmd: endTime.utc().format('yyyyMMDD'),
                searchEndHour: endTime.utc().format('HH'),
                searchEndMin: endTime.utc().format('mm'),
              },
              accessToken,
            );
        } catch (e) {
          console.log(e);
        }

        drivingLocations = [];
        if (startTime && endTime) {
          const objectTurnOffHistories =
            await this.raideaService.warningService.getWarningHistory(
              {
                objectUuId: booking.objectUuid,
                searchStartDt: String(
                  booking.objCtrlStartDt || booking.bookingStartDt,
                ),
                searchEndDt: String(
                  booking.returnCompleteDt || booking.bookingEndDt,
                ),
              },
              accessToken,
            );
          if (objectTurnOffHistories.length > 0) {
            drivingLocations = await Promise.all(
              objectTurnOffHistories
                .filter(
                  (history) =>
                    history.value === 'OFF' &&
                    history.latitude &&
                    history.longitude,
                )
                .map(async (item) => {
                  try {
                    const reverseGeoResponse =
                      await this.raideaService.drivingService.reverseGeocode(
                        item.latitude,
                        item.longitude,
                      );
                    return reverseGeoResponse?.data?.addressDetail;
                  } catch (e) {
                    console.log(e);
                    return '';
                  }
                }),
            );
          }
        }
      }

      const [templates] =
        await this.raideaService.cmsService.postMustacheTemplates(
          {
            category: this.raideaService.ENUM.TemplateCategoryType.INVOICE,
            event: this.raideaService.ENUM.TemplateEventType.ORDER_INVOICE,
            language: 'ko',
            service: 'email',
          },
          {
            DisplayHeader: isSend,
            DisplayFooter: isSend,
            DisplayDrivingInfo: googleMapImageUrl ? true : false,
            DisplayInvPayment:
              charges?.data?.[0]?.paymentTime !==
              this.raideaService.ENUM.PaymentTime.MONTHLY_SETTLEMENT,
            SupplierOperationTypeOwned: supplier.operationType,
            RsvnCustomer: user.username,
            RsvnCarModel: car.carDesc.carAttribute.brandName,
            RsvnCarFuelType: car.carDesc.carAttribute.trim
              ? `${
                  this.raideaService.ENUM.FuelTypeString[
                    car.carDesc.carAttribute.trim.fuelType
                  ]
                }`
              : null,
            RsvnDrivingRouteImage: googleMapImageUrl,
            RsvnUseDistance: drivingDistance,
            RsvnDrivingLocation: drivingLocations,
            RsvnCarNumber: car.carDesc.number,
            RsvnDuration: this.calculateManager.calculateTimestampGapToString(
              booking.bookingEndDt,
              booking.bookingStartDt,
            ),
            RsvnStart: this.calculateManager.formatting(
              this.calculateManager.transUnix(booking.bookingStartDt),
              'YYYY. MM. DD. HH:mm',
            ),
            RsvnUseEnd: this.calculateManager.formatting(
              this.calculateManager.transUnix(booking.bookingEndDt),
              'YYYY. MM. DD. HH:mm',
            ),
            InvTotalAmount: Number(
              Number(charges?.totalAmount ?? 0) -
                Number(charges?.totalCancelAmount ?? 0) -
                Number(charges?.totalDiscountAmount ?? 0),
            ).toLocaleString(),
            InvUse: booking.promotionCodeId
              ? charges.data
                  .map((val) => ({
                    InvDescription:
                      this.raideaService.ENUM.ChargeCategoryString[
                        val.chargeItemList.chargeItem
                      ],
                    InvAmount: Number(val.amount).toLocaleString(),
                  }))
                  .concat({
                    InvDescription: `쿠폰 (${booking.promotionCodeId ?? '-'})`,
                    InvAmount: Number(
                      charges.totalDiscountAmount,
                    ).toLocaleString(),
                  })
              : charges.data.map((val) => ({
                  InvDescription:
                    this.raideaService.ENUM.ChargeCategoryString[
                      val.chargeItemList.chargeItem
                    ],
                  InvAmount: Number(val.amount).toLocaleString(),
                })),
            InvPayment: bills.map((val) => ({
              InvPaymentDate: val.paidAt
                ? `${this.calculateManager
                    .unixToMoment(val.paidAt)
                    .format('YYYY-MM-DD HH:mm')} ${
                    val.cancelAmount ? '| 환불' : ''
                  }`
                : '',
              InvPaymentInfo: val.card,
              InvPaymentItem: val.chargeItem.map(
                (item) => this.raideaService.ENUM.ChargeCategoryString[item],
              ),
              InvAmount: Number(val.amount).toLocaleString(),
              InvPGTid: val.pgTid,
            })),
            RsvnSupplierCompanyName: supplierDto.companyName,
            RsvnSupplierRepresentativeName: supplierDto.representativeName,
            RsvnSupplierTaxPayerId: supplierDto.taxPayerId,
            RsvnSupplierSellersPermit: supplierDto.sellersPermit,
            RsvnSupplierAddress: `${supplierDto.address} ${supplierDto.detailAddress}`,
            RsvnSupplierRepresentativeTel:
              phoneUtil.formatOutOfCountryCallingNumber(
                phoneUtil.parseAndKeepRawInput(
                  supplierDto.representativeTel,
                  'KR',
                ),
                'KR',
              ),
          },
        );

      if (isSend) {
        // 이메일 발송
        const pureToken = accessToken.split(' ');
        const decoded = jwtDecode(pureToken[1]);
        const admin = await this.raideaService.authService.getUser(
          decoded.user_name,
          accessToken,
        );

        await this.raideaService.notificationService.postNotificationEmailByGSmtp(
          {
            sender: '카플랫 비즈',
            subject: `[카플랫비즈] 이용내역서 (${
              user.username
            }, ${moment().format('YYYY-MM-DD')}, ${
              car.carDesc.carAttribute.brandName
            })`,
            recipientList: [admin.email],
            body: [templates.content],
          },
          accessToken,
        );

        result.message = 'Statement Send';
        result.resultCode = HttpStatus.OK;
        return result;
      }

      result.message = 'Statement Detail';
      result.resultCode = HttpStatus.OK;
      result.payload = new OrdersDTO.GetOrderStatementResultDTO(
        templates.content,
      );

      return result;
    } catch (error) {
      console.log(error);
      return new ModelDto.ResponseDto(500, error);
    }
  }
}
