import { PartialType } from '@nestjs/mapped-types';
import { CreateConcentrateDto } from './create-concentrate.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class FertilizerConcentration {
  @ApiPropertyOptional({
    description: 'ID удобрения',
    example: '60f790f3b311f83d1f4f3f3d',
  })
  @IsString()
  fertilizer: string;

  @ApiPropertyOptional({
    description: 'Концентрация удобрения в процентах',
    example: 100,
  })
  @IsNumber()
  concentration: number;
}

/**
 * Data transfer object for updating a concentrate.
 */
export class UpdateConcentrateDto extends PartialType(CreateConcentrateDto) {
  @ApiPropertyOptional({
    description: 'Название концентрата',
    example: 'Раствор А',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Описание концентрата',
    example: 'Содержит макроэлементы',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Удобрения в концентрате с их концентрациями',
    type: [FertilizerConcentration],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FertilizerConcentration)
  @IsOptional()
  fertilizers?: FertilizerConcentration[];
}
