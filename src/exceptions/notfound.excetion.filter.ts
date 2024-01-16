import { Catch } from '@nestjs/common';
import { CarNotFound } from './car.not.found';
import { Request } from 'express';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';

import { ExceptionFilter } from '@nestjs/common';
@Catch(CarNotFound)
export class NotFoundExcetionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url + 'rad',
    });
  }
}
