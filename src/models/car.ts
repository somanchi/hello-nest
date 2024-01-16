import { Schema } from '@nestjs/mongoose';

import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';
import { Owner } from './owner';
import { Award } from './award';
import { SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Car {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  owner: Owner;

  @ApiProperty()
  @Prop()
  vehicleType: string;

  @ApiProperty()
  @Prop()
  awards: Array<Award>;

  @ApiProperty()
  @Prop()
  carId: string;
}

export const CarSchema: SchemaFactory = SchemaFactory.createForClass(Car);
