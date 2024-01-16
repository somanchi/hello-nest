import { v4 } from 'uuid';

export class BaseEvent<T> {
  eventId: string = v4();

  eventPublishedAt: number = new Date().valueOf();

  eventCreatedAt: number = new Date().valueOf();

  eventType: string;

  data: T;

  constructor(data: T, eventType: string) {
    this.data = data;
    this.eventType = eventType;
  }
}
