import { HttpStatus } from '@nestjs/common';

import { HttpException } from '@nestjs/common';

export class NodeasyncCustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
