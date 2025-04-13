import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

/**
 * The type of fertilizer.
 * @export
 * @enum {string}
 * @example 'solid'
 * @example 'liquid'
 */
export enum FertilizerType {
  SOLID = 'solid',
  LIQUID = 'liquid',
}

/**
 * Data transfer object for creating a fertilizer.
 * @export
 * @class CreateFertilizerDto
 */
export class CreateFertilizerDto {
  /**
   * The name of the fertilizer.
   * @type {string}
   * @memberof CreateFertilizerDto
   * @example 'Calcium Nitrate'
   */
  @ApiProperty({
    description: 'Название удобрения',
    example: 'Кальциевая селитра',
  })
  @IsString()
  name: string;

  /**
   * The description of the fertilizer.
   * @type {string}
   * @memberof CreateFertilizerDto
   * @example 'A fertilizer containing calcium nitrate.'
   */
  @ApiPropertyOptional({
    description: 'Описание удобрения',
    example: '15.5-0-0+19CaO',
  })
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The type of fertilizer.
   * @type {FertilizerType}
   * @memberof CreateFertilizerDto
   * @example 'solid'
   */
  @ApiProperty({
    description: 'Тип удобрения',
    enum: FertilizerType,
    example: FertilizerType.SOLID,
  })
  @IsEnum(FertilizerType)
  type: FertilizerType;

  /**
   * The price of the fertilizer.
   * @type {number}
   * @memberof CreateFertilizerDto
   * @example 5.99
   */
  @ApiPropertyOptional({
    description: 'Цена за килограмм',
    example: 1.5,
  })
  @IsOptional()
  @IsNumber()
  price?: number;
}
