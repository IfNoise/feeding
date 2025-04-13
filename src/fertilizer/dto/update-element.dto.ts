import { Optional } from '@nestjs/common';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateElementDto {
  @ApiPropertyOptional({
    description: 'Название элемента',
    example: 'Nitrogen',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Форма элемента (химическое соединение)',
    example: 'NO3',
  })
  @IsOptional()
  @IsString()
  form?: string;

  @ApiPropertyOptional({
    description: 'Концентрация элемента в процентах',
    example: 10,
  })
  @IsOptional()
  @IsNumber()
  concentration?: number;
}
