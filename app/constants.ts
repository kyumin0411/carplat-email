import * as RAIDEA_ENUM from './raidea/enum';

export const PAYMENT_METHOD = {
  DEPARTMENT_DEFAULTS: [
    {
      rightType: RAIDEA_ENUM.rightType.SHARE,
      category: RAIDEA_ENUM.paymentMethodCategory.BUSINESS_BOOKING,
      paymentTime: RAIDEA_ENUM.paymentTime.INSTANT_PAYMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.GROUP_CARD,
      billingStartDay: null,
      billingEndDay: null,
    },
    {
      rightType: RAIDEA_ENUM.rightType.SHARE,
      category: RAIDEA_ENUM.paymentMethodCategory.PERSONAL_BOOKING,
      paymentTime: RAIDEA_ENUM.paymentTime.INSTANT_PAYMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.INDIVIDUAL_CARD,
      billingStartDay: null,
      billingEndDay: null,
    },
    {
      rightType: RAIDEA_ENUM.rightType.SHARE,
      category: RAIDEA_ENUM.paymentMethodCategory.SUBSCRIPTION,
      paymentTime: RAIDEA_ENUM.paymentTime.TERM_PAYMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.GROUP_CARD,
      billingStartDay: 25,
      billingEndDay: 31,
    },
    {
      rightType: RAIDEA_ENUM.rightType.EXCLUSIVE,
      category: RAIDEA_ENUM.paymentMethodCategory.BUSINESS_BOOKING,
      paymentTime: RAIDEA_ENUM.paymentTime.MONTHLY_SETTLEMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.TAX_BILL,
      billingStartDay: 1,
      billingEndDay: 1,
    },
    {
      rightType: RAIDEA_ENUM.rightType.EXCLUSIVE,
      category: RAIDEA_ENUM.paymentMethodCategory.PERSONAL_BOOKING,
      paymentTime: RAIDEA_ENUM.paymentTime.INSTANT_PAYMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.INDIVIDUAL_CARD,
      billingStartDay: null,
      billingEndDay: null,
    },
    {
      rightType: RAIDEA_ENUM.rightType.EXCLUSIVE,
      category: RAIDEA_ENUM.paymentMethodCategory.SUBSCRIPTION,
      paymentTime: RAIDEA_ENUM.paymentTime.MONTHLY_SETTLEMENT,
      paymentMethod: RAIDEA_ENUM.paymentMethod.TAX_BILL,
      billingStartDay: 1,
      billingEndDay: 1,
    },
  ],
};
