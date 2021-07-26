import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { EmailService } from './email.service';
import * as OrdersDTO from '../dto/orders.dto';

@ApiTags('Email Service: 이메일 HTML 전송')
@ApiBearerAuth()
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/:orderId')
  @ApiOperation({ summary: '이용내역서 조회' })
  @ApiParam({
    name: 'orderId',
    type: 'string',
    description: '예약 ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OrdersDTO.GetOrderStatementResultDTO,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '',
  })
  async getStatement(
    @Req() req: Request,
    @Res() res: Response,
    @Param('orderId') orderId: string,
  ) {
    const result = await this.emailService.getOrderStatement(
      req.headers.authorization,
      orderId,
    );
    res.status(result.resultCode).json({
      resultCode: result.resultCode,
      message: result.message,
      payload: result.payload,
    });
  }

  @Post('/:orderId')
  @ApiOperation({ summary: '이용내역서 관리자 발송' })
  @ApiParam({
    name: 'orderId',
    type: 'string',
    description: '예약 ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '',
  })
  async postSendStatement(
    @Req() req: Request,
    @Res() res: Response,
    @Param('orderId') orderId: string,
  ) {
    const result = await this.emailService.getOrderStatement(
      req.headers.authorization,
      orderId,
      true,
    );
    res.status(result.resultCode).json({
      resultCode: result.resultCode,
      message: result.message,
      payload: result.payload,
    });
  }
}
