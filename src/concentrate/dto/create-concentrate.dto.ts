import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

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
}
