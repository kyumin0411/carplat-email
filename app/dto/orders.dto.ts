import { ApiProperty } from '@nestjs/swagger';

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
