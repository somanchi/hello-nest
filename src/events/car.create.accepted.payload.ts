import { CreateCarInput } from '../inputs/car.input';
import { Context } from '../entities/context';

export class CarCreateAcceptedPayload {
  acknowledgedCarId: string;

  createCarInput: CreateCarInput;

  context: Context;

  constructor(
    acknowledgedCarId: string,
    createCarInput: CreateCarInput,
    context: Context,
  ) {
    this.acknowledgedCarId = acknowledgedCarId;
    this.createCarInput = createCarInput;
    this.context = context;
  }
}
