import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
/*
Base Model Dto
 */

export class ResponseDto {
  resultCode: number = HttpStatus.OK;
  message = '';
  payload?: any = null;
  constructor(resultCode?: number, message?: string, payload?: any) {
    (this.resultCode = resultCode),
      (this.message = message),
      (this.payload = payload);
  }
}
export class HeaderDto {
  Authorization: string;
}
export class ServerResponseDto {
  code: number;
  message: string;
  data: any;
}

export class CardDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  isNameOn: boolean;
  @ApiProperty({})
  cardCorp: string;
  @ApiProperty({})
  cardNumber: string;
  @ApiProperty({})
  cardType: string;
  @ApiProperty({})
  expiration: string;
}
export class BusinessSubsDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  product: number;
  @ApiProperty({})
  status: number;
  @ApiProperty({})
  userNumber: number;
  @ApiProperty({})
  thisMonthPrice: number;
  @ApiProperty({})
  nextMonthPrice: number;
  @ApiProperty({})
  startDate: number;
  @ApiProperty({})
  endDate: number;
  @ApiProperty({})
  renewDate: number;
  @ApiProperty({})
  card: CardDto;
}
export class UserGroupDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  employeeNumber: number;
  @ApiProperty({})
  card: CardDto;
  @ApiProperty({})
  paymentAmount: number;
}

export class EmployeeDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  username: string;
  @ApiProperty({})
  email: string;
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  phoneNumber: string;
  @ApiProperty({})
  number: string;
  @ApiProperty({})
  userGroup: UserGroupDto;
  @ApiProperty({})
  joinDate: number;
  @ApiProperty({})
  license: number;
}
export class AdminDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  username: string;
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  email: string;
  @ApiProperty({})
  recentLogin: number;
}

export class CorpInfoDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  name: string;
  @ApiProperty({})
  address: string;
  @ApiProperty({})
  companyNumber: string;
  @ApiProperty({})
  isLimited: boolean;
  @ApiProperty({})
  limitedAmount: number;
  @ApiProperty({})
  noticeType: number;
  @ApiProperty({})
  employeeNumberUsage: boolean;
  @ApiProperty({})
  userGroupUsage: boolean;
  @ApiProperty({})
  card: CardDto;
  @ApiProperty({})
  businessSubs: BusinessSubsDto;
}

export class RentalDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  status: number;
  @ApiProperty({})
  number: string;
  @ApiProperty({})
  startDate: number;
  @ApiProperty({})
  endDate: number;
  @ApiProperty({})
  carNumber: string;
  @ApiProperty({})
  purpose: number;
  @ApiProperty({})
  employee: EmployeeDto;
}

export class PaymentDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  date: number;
  @ApiProperty({})
  cancelDate: number;
  @ApiProperty({})
  card: CardDto;
  @ApiProperty({})
  amount: number;
  @ApiProperty({})
  item: number;
  @ApiProperty({})
  status: number;
  @ApiProperty({})
  rentalNumber: string;
}

export class AnnouncementDto {
  @ApiProperty({})
  id: number;
  @ApiProperty({})
  title: string;
  @ApiProperty({})
  content: string;
  @ApiProperty({})
  createdAt: number;
}
