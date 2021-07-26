import * as moment from 'moment-timezone';

export class CalculateManager {
  constructor() {
    moment.locale('ko');
  }

  getUnixTime(date: Date) {
    return moment.unix(moment(date).unix()).format('X');
  }

  getTodayUnixTime() {
    return moment.unix(moment().unix()).format('X');
  }

  getNextStartDate() {
    const today = moment();
    if (today.date() < 25) {
      //익월 1일
      return today.add(1, 'month').startOf('month').toDate();
    } else {
      //익익월 1일
      return today.add(2, 'month').startOf('month').toDate();
    }
  }

  getPeriodicPrice(basicPrice, userNumber, maxUserNumber, addtionalPrice) {
    return basicPrice + (userNumber - maxUserNumber) * addtionalPrice;
  }
  setTimeGapString = (d, s) => (d ? d + s : '');

  calculateTimestampGapToString(s, e) {
    const gap = Math.abs(e - s);

    return `${this.setTimeGapString(
      Math.trunc(gap / 60 / 60 / 24),
      '일 ',
    )}${this.setTimeGapString(
      Math.trunc((gap / 60 / 60) % 24),
      '시간 ',
    )}${this.setTimeGapString(Math.trunc((gap / 60) % 60), '분 ')}`;
  }

  unixToMoment(utcUnixEpoch: number) {
    return moment.unix(utcUnixEpoch);
  }
  transUnix(unix: number) {
    return moment.unix(unix);
  }
  formatting(mObj: moment.Moment, fStr: string) {
    return mObj.tz('Asia/Seoul').format(fStr);
  }
}
