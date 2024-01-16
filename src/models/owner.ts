import { ApiProperty } from '@nestjs/swagger';
import { Prop } from '@nestjs/mongoose';

export class Owner {
  @ApiProperty()
  @Prop()
  name: string;
}
