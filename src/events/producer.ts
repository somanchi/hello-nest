import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { Message } from 'kafkajs';
import { BaseEvent } from './base.event';

@Injectable()
export class KafkaProducer {
  constructor(@Inject('DEFAULT') readonly defaultClient: ClientKafka) {}

  async onModuleInit() {
    this.defaultClient.connect();
  }

  getMessage(event: BaseEvent<any>, key: string) {
    const message: Message = {
      key: key,
      value: JSON.stringify(event),
      headers: {
        key: key,
        eventType: event.eventType,
      },
    };
    return message;
  }

  sendCarEvent(event: BaseEvent<any>, key: string) {
    const message = this.getMessage(event, key);
    this.defaultClient.emit('sh.radical.nodeasync.events', message);
  }
}
