import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { FertilizerType } from './create-fertilizer.dto';

export class UpdateFertilizerDto {
  @ApiPropertyOptional({
    description: 'Название удобрения',
    example: 'Кальциевая селитра',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Описание удобрения',
    example: '15.5-0-0+19CaO',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Тип удобрения',
    enum: FertilizerType,
    example: FertilizerType.SOLID,
  })
  @IsOptional()
  @IsEnum(FertilizerType)
  type?: FertilizerType;

  @ApiPropertyOptional({
    description: 'Цена за килограмм',
    example: 1.5,
  })
  @IsOptional()
  @IsNumber()
  price?: number;
}
