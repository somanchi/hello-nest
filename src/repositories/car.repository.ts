import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Car } from '../models/car';
import { CrudRepository } from './crud.repository.interface';
@Injectable()
export class CarRepository implements CrudRepository<Car, string> {
  constructor(@InjectModel(Car.name) public model: Model<Car>) {}

  async save(entity: Car): Promise<Car> {
    const modifiedModel = new this.model(entity);
    return modifiedModel.save();
  }

  async findById(id: string): Promise<Car | undefined> {
    const existingModel = await this.model.findById(id);
    return existingModel;
  }

  async deleteById(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}
