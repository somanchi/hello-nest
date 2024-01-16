import { Controller } from '@nestjs/common';
import { CarService } from '../services/car.service';

import { HttpStatus } from '@nestjs/common';
import { NodeasyncCustomException } from '../exceptions/nodeasync.custom.exception';
import { EventPattern } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';
import { BaseEvent } from './base.event';
import { Ctx } from '@nestjs/microservices';
import { KafkaContext } from '@nestjs/microservices';
import { CarCreateAcceptedPayload } from './car.create.accepted.payload';
@Controller()
export class KafkaConsumer {
  constructor(private carService: CarService) {
    this.carCreateAccepted = this.carCreateAccepted.bind(this);
  }

  @EventPattern('sh.radical.nodeasync.events', Transport.KAFKA)
  customRouter(@Payload() event: BaseEvent<any>, @Ctx() context: KafkaContext) {
    try {
      const EVENT_HEADER = 'eventType';
      const eventHeaderToFunction = new Map();
      eventHeaderToFunction.set(
        'sh.radical.nodeasync.events.CarCreateAccepted',
        this.carCreateAccepted,
      );
      const headers = context.getMessage().headers;
      eventHeaderToFunction.get(headers[EVENT_HEADER])(event);
    } catch (e) {
      console.log(e);
      throw new NodeasyncCustomException(
        'failed to consume message',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  carCreateAccepted(event: BaseEvent<CarCreateAcceptedPayload>) {
    this.carService.handleCarCreateAccepted(
      event.data.acknowledgedCarId,
      event.data.createCarInput,
      event.data.context,
    );
  }
}
