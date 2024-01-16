import { Controller } from '@nestjs/common';
import { Response } from 'express';
import { v4 } from 'uuid';
import { Delete } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Context } from '../entities/context';

import { Put } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UpdateCarInput } from '../inputs/car.update';
import { Res } from '@nestjs/common';

import { Post } from '@nestjs/common';
import { CreateCarInput } from '../inputs/car.input';
import { CarService } from '../services/car.service';
@Controller('/v1/')
export class CarController {
  @Delete('cars/:carId')
  async delete(@Param('carId') carId: string, context: Context) {
    this.carService.delete(carId, context);
  }

  @Put('cars/:carId')
  async update(
    @Param('carId') carId: string,
    @Body() updateCarInput: UpdateCarInput,
    context: Context,
    @Res() response: Response,
  ) {
    const updtedCar = this.carService.update(carId, updateCarInput, context);
    response.setHeader('Location', '/v1/cars/' + carId);
    response.json(updtedCar);
    return response;
  }

  @Post('cars')
  async create(
    @Body() createCarInput: CreateCarInput,
    context: Context,
    @Res() response: Response,
  ) {
    const carId = v4();
    const created = this.carService.create(carId, createCarInput, context);
    response.setHeader('Location', '/v1/cars/' + carId);
    response.json(created);
    return response;
  }

  constructor(private carService: CarService) {}
}
