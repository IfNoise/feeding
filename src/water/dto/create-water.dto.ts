import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateElementDto } from './create-element.dto';

export class CreateWaterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  pH: number;

  @IsNumber()
  @IsNotEmpty()
  EC: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateElementDto)
  elements: CreateElementDto[];
}
