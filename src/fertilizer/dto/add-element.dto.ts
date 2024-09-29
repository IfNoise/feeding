import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, Max, Min, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class AddElementDto {
  @IsMongoId()
  _id: Types.ObjectId;
  @ApiProperty({
    name: 'name',
    description: 'Name of the element',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: 'concentration',
    description: 'Concentration of the element in the fertilizer',
    type: Number,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  concentration: number;
}
