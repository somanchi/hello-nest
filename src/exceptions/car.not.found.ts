import { HttpStatus } from '@nestjs/common';

import { NodeasyncCustomException } from './nodeasync.custom.exception';

export class CarNotFound extends NodeasyncCustomException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
