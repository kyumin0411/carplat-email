import { ApiProperty } from '@nestjs/swagger';

export class OrdersDTO {
  @ApiProperty({ description: '예약 uuid' })
  id: string;
  @ApiProperty({
    description:
      '예약 상태 [ 1 차량예약 | 2 차량대여 | 3 예약취소 | 4 반납지연 | 5 이용완료 ]',
  })
  status: number;
  @ApiProperty({ description: '대여기간시작일' })
  startDate: string;
  @ApiProperty({ description: '대여종료일' })
  endDate: string;
  @ApiProperty({ description: '차량번호' })
  carNumber: string;
  @ApiProperty({ description: '차량회사' })
  carCorp: string;
  @ApiProperty({ description: '차량이름' })
  carName: string;
  @ApiProperty({ description: '차량이미지 URL' })
  carImageUrl: string;
  @ApiProperty({ description: '목적 [ 외근 | 출장 | 사내행사 | 기타 ]' })
  purpose: string;
  @ApiProperty({ description: '목적 상세' })
  purposeDetail: string;
  @ApiProperty({ description: '사원이름' })
  employeeName: string;
  @ApiProperty({ description: '사원전화번호' })
  employeePhoneNumber: string;
  @ApiProperty({ description: '사원 부서명' })
  departmentName: string;
  @ApiProperty({ description: '사원번호' })
  employeeNumber: string;
  @ApiProperty({ description: '예약 생성일' })
  insertDate: string;
  @ApiProperty({ description: '사용 시작일' })
  usageStartDate: string;
  @ApiProperty({ description: '사용 종료일' })
  usageEndDate: string;
  @ApiProperty({ description: '이용시간  (단위 시간)' })
  usagePeriod: number;
  @ApiProperty({ description: 'bill 존재 여부' })
  existBills: boolean;

  constructor(
    id?,
    status?,
    startDate?,
    endDate?,
    carNumber?,
    carCorp?,
    carName?,
    carImageUrl?,
    purpose?,
    purposeDetail?,
    employeeName?,
    employeePhoneNumber?,
    departmentName?,
    employeeNumber?,
    insertDate?,
    usageStartDate?,
    usageEndDate?,
    usagePeriod?,
    existBills?,
  ) {
    this.id = id;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.carNumber = carNumber;
    this.carCorp = carCorp;
    this.carName = carName;
    this.carImageUrl = carImageUrl;
    this.purpose = purpose;
    this.purposeDetail = purposeDetail;
    this.employeeName = employeeName;
    this.employeePhoneNumber = employeePhoneNumber;
    this.departmentName = departmentName;
    this.employeeNumber = employeeNumber;
    this.insertDate = insertDate;
    this.usageStartDate = usageStartDate;
    this.usageEndDate = usageEndDate;
    this.usagePeriod = usagePeriod;
    this.existBills = existBills;
  }
}
export class GetOrdersMetaDTO {
  @ApiProperty({ description: '전체 카운트' })
  totalCount: number;
}
export class GetOrdersResultDTO {
  @ApiProperty({ description: '', type: GetOrdersMetaDTO })
  meta: GetOrdersMetaDTO;
  @ApiProperty({ type: OrdersDTO, isArray: true })
  orders: OrdersDTO[];
}
export class SupplierDTO {
  @ApiProperty({ description: '업체 상호명' })
  companyName: string;
  @ApiProperty({ description: '대표자 명' })
  representativeName: string;
  @ApiProperty({ description: '사업자 번호' })
  taxPayerId: string;
  @ApiProperty({ description: '통신판매신고번호' })
  sellersPermit: string;
  @ApiProperty({ description: '주소' })
  address: string;
  @ApiProperty({ description: '상세 주소' })
  detailAddress: string;
  @ApiProperty({ description: '대표전화번호' })
  representativeTel: string;
}

export class GetOrderStatementResultDTO {
  @ApiProperty({ description: '템플릿 HTML' })
  template: string;

  constructor(template) {
    this.template = template;
  }
}
