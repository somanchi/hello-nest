import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Context } from '../entities/context';

import { CarService } from '../services/car.service';
@Controller('/v1/')
export class CarQueryController {
  @Get('cars/:carId')
  async get(@Param('carId') carId: string, context: Context) {
    const existingCar = await this.carService.get(carId, context);
    return existingCar;
  }

  constructor(private carService: CarService) {}
}
