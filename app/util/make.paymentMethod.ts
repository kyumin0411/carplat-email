import { CardDTO } from 'raidea_module/dto';
import { BillEnum } from 'app/enum';

const makePaymentMethod = (
  methodType: number,
  _card: CardDTO,
  mainCard?: CardDTO,
): string => {
  switch (methodType * 1) {
    case BillEnum.paymentMethod.GROUP_CARD: {
      if (_card) {
        return `${_card?.cardCompany.replace('[', '').replace(']', '')} (${
          _card?.cardNum
        })`;
      } else if (mainCard) {
        return `${mainCard?.cardCompany.replace('[', '').replace(']', '')} (${
          mainCard?.cardNum
        })`;
      }
      return '대표카드';
    }
    case BillEnum.paymentMethod.INDIVIDUAL_CARD: {
      return _card
        ? `${_card?.cardCompany.replace('[', '').replace(']', '')} (${
            _card?.cardNum
          })`
        : `삭제된 카드`;
    }
    default: {
      return '세금계산서 발행';
    }
  }
};

export default makePaymentMethod;
