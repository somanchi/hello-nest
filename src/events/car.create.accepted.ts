import { CarCreateAcceptedPayload } from './car.create.accepted.payload';

import { BaseEvent } from './base.event';

export class CarCreateAccepted extends BaseEvent<CarCreateAcceptedPayload> {
  constructor(data: CarCreateAcceptedPayload) {
    super(data, 'sh.radical.nodeasync.events.CarCreateAccepted');
  }
}
