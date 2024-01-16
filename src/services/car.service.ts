import { Injectable } from '@nestjs/common';
import { CarCreateAccepted } from '../events/car.create.accepted';
import { CarCreateAcceptedPayload } from '../events/car.create.accepted.payload';
import { Context } from '../entities/context';

import { UpdateCarInput } from '../inputs/car.update';
import { CreateCarInput } from '../inputs/car.input';
import { createCar } from '../mappers/car.mapper';
import { updateCar } from '../mappers/car.mapper';
import { CarNotFound } from '../exceptions/car.not.found';
import { KafkaProducer } from '../events/producer';
import { CarRepository } from '../repositories/car.repository';
@Injectable()
export class CarService {
  async delete(carId: string, context: Context) {
    const existingCarData = await this.carRepository.findById(carId);
    if (!existingCarData) {
      throw new CarNotFound('failed to getby Id carId}');
    }
    await this.carRepository.deleteById(carId);
  }

  async update(
    carId: string,
    updateCarInput: UpdateCarInput,
    context: Context,
  ) {
    const existingCarData = await this.carRepository.findById(carId);
    if (existingCarData) {
      const updatedCar = updateCar(
        carId,
        updateCarInput,
        context,
        existingCarData,
      );
      const savedCar = this.carRepository.save(updatedCar);
      return savedCar;
    } else {
      throw new CarNotFound('failed to getby Id carId}');
    }
  }

  async create(
    carId: string,
    createCarInput: CreateCarInput,
    context: Context,
  ) {
    this.kafkaProducer.sendCarEvent(
      new CarCreateAccepted(
        new CarCreateAcceptedPayload(carId, createCarInput, context),
      ),
      carId,
    );
  }

  async handleCarCreateAccepted(
    carId: string,
    createCarInput: CreateCarInput,
    context: Context,
  ) {
    const car = createCar(carId, createCarInput, context);
    await this.carRepository.save(car);
  }

  async get(carId: string, context: Context) {
    const existingCar = await this.carRepository.findById(carId);
    return existingCar;
  }

  constructor(
    private kafkaProducer: KafkaProducer,
    private carRepository: CarRepository,
  ) {}
}
