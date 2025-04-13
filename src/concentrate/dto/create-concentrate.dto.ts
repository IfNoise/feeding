import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class FertilizerConcentration {
  @ApiProperty({
    description: 'ID удобрения',
    example: '60f790f3b311f83d1f4f3f3d',
  })
  @IsString()
  fertilizer: string;

  @ApiProperty({
    description: 'Концентрация удобрения в процентах',
    example: 100,
  })
  @IsNumber()
  concentration: number;
}

export class CreateConcentrateDto {
  @ApiProperty({
    description: 'Название концентрата',
    example: 'Раствор А',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Описание концентрата',
    example: 'Содержит макроэлементы',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Удобрения в концентрате с их концентрациями',
    type: [FertilizerConcentration],
    example: [
      { fertilizer: '60f790f3b311f83d1f4f3f3d', concentration: 100 },
      { fertilizer: '60f790f3b311f83d1f4f3f3e', concentration: 50 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FertilizerConcentration)
  fertilizers: FertilizerConcentration[];
}
