import { Optional } from '@nestjs/common';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateElementDto {
  @IsNumber()
  @Optional()
  @Min(0)
  @Max(100)
  concentration: number;
}
