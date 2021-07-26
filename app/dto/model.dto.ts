import { HttpStatus } from '@nestjs/common';

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
