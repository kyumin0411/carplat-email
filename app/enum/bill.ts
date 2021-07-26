export enum billStatus {
  ready = 'ready',
  paid = 'paid',
  cancelled = 'cancelled',
  failed = 'failed',
}

export enum paymentMethod {
  GROUP_CARD = 1, // 대표카드
  TAX_BILL = 2, // 세금계산서
  INDIVIDUAL_CARD = 3, // 선택카드
}

export enum paymentTime {
  IMMEDIATELY_PAYMENT = 1, // 단건즉시결제
  TERM_PAYMENT = 2, // 단건기간지정결제
  MONTHLY_PAYMENT = 3, // 월정산
}
