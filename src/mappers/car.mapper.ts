import { UpdateCarInput } from '../inputs/car.update';
import { Context } from '../entities/context';
import { Car } from '../models/car';

import { CreateCarInput } from '../inputs/car.input';

export const updateCar = (
  id: string,
  input: UpdateCarInput,
  context: Context,
  existingModel: Car,
) => {
  existingModel.name = input.name;
  existingModel.owner = input.owner;
  existingModel.vehicleType = input.vehicleType;
  existingModel.awards = input.awards;
  existingModel.carId = id;
  return existingModel;
};

export const createCar = (
  id: string,
  input: CreateCarInput,
  context: Context,
) => {
  const model = new Car();
  model.name = input.name;
  model.owner = input.owner;
  model.vehicleType = input.vehicleType;
  model.awards = input.awards;
  model.carId = id;
  return model;
};
