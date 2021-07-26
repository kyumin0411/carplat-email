// Enum의 종류에 따라 파일 분리 여부 논의 필요
export enum SubscriptionTypeEnum {
  business = 1,
  personal = 2,
}

export enum PaymentStatusEnum {
  ready = 'ready',
  paid = 'paid',
  wait = 'wait',
  cancelled = 'cancelled',
  partialCancelled = 'partialCancelled',
  failed = 'failed',
}

export enum ChargeItem {
  SUBSCRIPTION_PRICE = 1,
  ADD_SUBSCRIPTION_PRICE,
  USING_PRICE,
  DRIVE_PRICE,
  PENALTY_PRICE,
  CANCEL_PRICE,
  HI_PASS_PRICE,
  ETC = 99,
}

export enum ChargeItemStringEnum {
  DRIVE_PRICE = '주행료',
}

export enum ChargeType {
  PAYMENT = 1,
  REFUND = 2,
}

export enum SubscriptionStatusEnum {
  waiting = 1,
  approve,
  rejected,
  timout,
  subscribing,
  unsubscription,
}

export enum PaymentStatus {
  READY = 'ready', // 초기 생성
  PAID = 'paid', // 결제 완료
  WAIT = 'wait', // 발행 대기
  CANCELED = 'cancelled', // 전체 취소
  PARTIAL_CANCELED = 'partialCancelled', // 부분 취소
  FAILED = 'failed', // 결제 실패
}

export enum SubscriptionRightTypeEnum {
  exclusive = 1,
  share = 2,
}

// User 안에 잇는 licenceValidStatus
export enum licenseValidStatus {
  NONE,
  WAITING,
  APPROVED,
  REJECTED,
  EXPIRED,
}

export enum phoneValidStatus {
  NONE,
  READY,
  APPROVE,
  REJECT,
  EXPIRED,
}

export enum objectLicenseType {
  CLASS1_LARGE = 'class1Large',
  CLASS1_REGULAR = 'class1Regular',
  CLASS1_SPECIAL = 'class1Special',
  CLASS2_REGULAR = 'class2Regular',
  CLASS2_SMALL = 'class2Small',
  CLASS2_BICYCLE = 'class2Bicycle',
}

// Licence 안에 있는 status 필드
export enum licenseStatus {
  NONE,
  WAITING,
  APPROVED,
  REJECTED,
  EXPIRED,
}

export enum licenseTypeFromRecognitionService {
  TYPE1_LARGE = 'type1-large',
  TYPE1_COMMON = 'type1-common',
  TYPE2_COMMON = 'type2-common',
}

export enum licenseType {
  TYPE1_LARGE = 1, // 1종 대형
  TYPE1_COMMON, // 1종 보통
  TYPE1_SMALL, // 1종 소형
  TYPE1_SPECIAL, // 1종 특수
  TYPE2_COMMON, // 2종 보통
  TYPE2_SMALL, // 2종 소형
  BIKE, // 원동기장치자전거
}

export enum subscriptionStatus {
  WAITING = 1,
  APPROVED,
  REJECTED,
  TIMEOUT,
  SUBSCRIBING,
  UNSUBSCRIPTION,
}

export enum subscriptionHistoryStatus {
  WAITING = 'waiting', // 구독 승인 대기
  APPROVED = 'approved', // 구독 승인 완료
  REJECTED = 'rejected', // 구독 신청 반려
  ING = 'ing', // 구독중
  WAITING_CANCEL = 'waitingCancel', // 구독 취소 대기
  CANCELED = 'canceled', // 구독 해지
}

export enum cardType {
  NONE,
  PERSONAL,
  BUSINESS,
}

export enum cardTypeEnum {
  NONE,
  PERSONAL,
  PERSONAL_BUSINESS,
  BUSINESS,
  BUSINESS_PERSONAL,
}

export enum subscriptionType {
  COMPANY = 1,
  PERSONAL = 2,
}

export enum rightType {
  SHARE = 1,
  EXCLUSIVE = 2,
}

export enum subscriptionProductStatus {
  NON_SALE,
  SALE,
}

// 차량 배정상태
export enum subscriptionAllocateStatus {
  UNASSIGNED,
  ASSIGNMENT,
}

export enum ChargeStatus {
  INIT = 1,
  OPEN = 2,
  CANCELED = 3,
  IMPOSSIBLE = 4,
  PAID = 5,
  PARTIAL_PAID = 6,
  NOT_PAID = 7,
}

export enum paidStatus {
  PAYMENT_SUCCESS = 1,
  CANCEL,
  PARTIAL_PAYMENT,
  PAYMENT_FAIL,
  CANCEL_FAIL,
}

export enum objectType {
  NONE,
  CAR,
  BICYCLE,
  KICKBOARD,
  MOTORCYCLE,
  SLOT,
  HOUSE,
}

export enum objectUseStatus {
  USE = 1,
}

export enum bookingStatus {
  TEMPORARY_RESERVATION, // 임시예약
  RESERVATION, // 예약완료
  START_DELAY, // 시작지연
  USING, // 이용중
  COMPLETED, // 이용완료
  RETURN_DELAY, // 반납지연
  CANCELED, // 예약취소
  ACCIDENT, // 사고접수
  PAYMENT_FAIL, // 결제실패
  FORCE_RETURN, // 강제반납
  RESERVATION_FAIL, // 디바이스예약실패
  RETURN_DELAY_PREDICT, // 반납지연예상
  EARLY_RETURN, // 조기반납
}

export enum subUsageType {
  NONE,
  ALLOW_PERSONAL_USE,
}

/*
pricingPolicy.type (integer)
- 0x100 ~ 0x17F : 카플랫 기업 요금제 범위
    -- 0x100 : 베이직
    -- 0x101 : 스탠다드
    -- 0x102 : 프리미엄
- 0x180 ~ 0x1FF : 카플랫 개인 요금제 범위
    -- 0x180 : 주말
    -- 0x181 : 주말+출퇴근
카플랫 총 256개 할당 (기업 요금제, 개인 요금제 각 128개씩 확장 가능)
*/
export enum pricingPolicyType {
  BASIC = 256,
  STANDARD = 257,
  PREMIUM = 258,
  WEEKEND = 384,
  ALL = 385,
}

export enum pricingPolicyStatus {
  NON_SALE,
  SALE,
}

export enum bookingSearchDateType {
  BOOKING_START_DT = 'bookingStartDt',
  BOOKING_END_DT = 'bookingEndDt',
  INSERT_DATE = 'insertDate',
  UPDATE_DATE = 'updateDate',
  OBJ_CTRL_START_DT = 'objCtrlStartDt',
  BOOKING_CANCEL_DT = 'bookingCancelDt',
  RETURN_COMPLETE_DT = 'returnCompleteDt',
}

export enum parkingInfoType {
  FIXED_PARKING = 1, // 고정 주차 자리 (없을 수 있음)
  ACTUALLY_PARKING = 2, // 실제로 주차된 자리
}

export enum controlType {
  DOOR_OPEN = 'doorOpen', // 문열림
  DOOR_CLOSE = 'doorClose', // 문닫힘
  HORN_ON = 'hornOn', // 경적
  HAZARD_ON = 'hazardOn', // 비상등
  TRUNK_ON = 'trunkOn', // 트렁크
}

export enum conditionCheckType {
  EXTERIOR,
  INTERIOR,
}

export enum conditionNo {
  USED_BEFORE,
  USED_AFTER,
}

export enum osType {
  UNKNOWN,
  ANDROID,
  IOS,
}

export enum relayStatus {
  BEFORE = 'before',
  AFTER = 'after',
}

export enum groupStatus {
  NONE, // 미승인
  WAIT, // 승인대기
  APPROVED, // 승인
  REJECT, //거절
}

export enum groupType {
  NONE = 0, // 미정의
  COMPANY = 1, // 법인
  NON_PROFIT_ORGANIZATION = 2, // 비영리단체
  COMMUNITY = 3, // 커뮤니티
  GROUP = 9, // 단순 member grouping 을 위한 group
}

export enum alimTalkTemplateCode {
  BOOKING_COMPLETE = 'PerBookingComplete02',
  RETURN_COMPLETE = 'PerReturnComplete01',
  RETURN_DELAY_COMPLETE = 'PenaltyDelayedReT01',
  BOOKING_CANCEL = 'BookingCancel01',
}

export enum daysString {
  SUN = 'Sun',
  MON = 'Mon',
  TUE = 'Tue',
  WED = 'Wed',
  THU = 'Thu',
  FRI = 'Fri',
  SAT = 'Sat',
  HOLIDAY = 'Holiday',
}

export enum paymentTime {
  INSTANT_PAYMENT = 1, // 단건즉시결제
  TERM_PAYMENT = 2, // 단건기간지정결제
  MONTHLY_SETTLEMENT = 3, // 월정산
}

export enum paymentMethod {
  GROUP_CARD = 1, // 대표카드
  TAX_BILL = 2, // 세금계산서
  INDIVIDUAL_CARD = 3, // 선택카드
}

export enum paymentMethodCategory {
  BUSINESS_BOOKING = 1, // 업무용 예약 (bookingType 1-업무용)
  PERSONAL_BOOKING = 2, // 개인용 예약 (bookingType 2-개인용, 7-업무 시 간내 개인용)
  SUBSCRIPTION = 3, // 구독료
}

/**
 * New Enums with conventions
 * enum Direction {
 *   Up,
 *   Down,
 *   Left,
 *   Rigth,
 * }
 */
export enum SubscriptionType {
  Company = 1, // 기업 구독
  Personal = 2, // 개인 구독
}

export enum UsePurpose {
  OUTSIDE = '1', // 외근
  BUSINESS_TRIP = '2', // 출장
  EVENT = '3', // 행사
  ETC = '99', // 기타
}

export enum BookingSearchDateType {
  BookingStartDt = 'bookingStartDt',
  BookingEndDt = 'bookingEndDt',
  InsertDate = 'insertDate',
  UpdateDate = 'updateDate',
  ObjCtrlStartDt = 'objCtrlStartDt',
  BookingCancelDt = 'bookingCancelDt',
  ReturnCompleteDt = 'returnCompleteDt',
}

export enum BookingType {
  BUSINESS = 1, // 업무용
  PERSONAL, // 개인용
  ALLOCATION, // 배차
  WASH, // 세차
  PAUSE, // 휴차
  MAINTENANCE, // 정비
  PERSONAL_WORK_TIME, // 개인구독 & 업무시간의 개인용만 해당
  ETC = 99, // 기타
}

export enum BookingStatus {
  TemporaryOrder, // 임시예약
  Reserved, // 예약완료
  StartDelay, // 시작지연
  Using, // 이용중
  Completed, // 이용완료
  ReturnDelay, // 반납지연
  Canceled, // 예약취소
  Accident, // 사고접수
  PaymentFailed, // 결제실패
  ForceReturn, // 강제반납
  ReserveFailed, // 디바이스예약실패
  ReturnDelayPredict, // 반납지연예상
  EarlyReturnEarly, // 조기반납
}

// 라이디어 호출 파라미터로 빼야함
export enum OrderBy {
  ASC = 1,
  DESC = 2,
}

export enum SupplierOperationType {
  OWNED,
  SUBSIDIARY,
  FRANCHISEE,
  PARTNERSHIP,
}

export enum BookingType {}
