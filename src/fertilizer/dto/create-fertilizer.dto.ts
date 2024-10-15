import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

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
    description: 'The name of the fertilizer',
    type: String,
  })
  @IsString()
  name: string;

  /**
   * The type of fertilizer.
   * @type {FertilizerType}
   * @memberof CreateFertilizerDto
   * @example 'solid'
   */
  @ApiProperty({
    description: 'The type of fertilizer',
    type: String,
    enum: FertilizerType,
  })
  @IsEnum(FertilizerType)
  type: FertilizerType;

  /**
   * The description of the fertilizer.
   * @type {string}
   * @memberof CreateFertilizerDto
   * @example 'A fertilizer containing calcium nitrate.'
   */
  @ApiProperty({
    description: 'The description of the fertilizer',
    type: String,
  })
  @IsString()
  description: string;

  /**
   * The price of the fertilizer.
   * @type {number}
   * @memberof CreateFertilizerDto
   * @example 5.99
   */
  @ApiProperty({
    description: 'The price of the fertilizer',
    type: Number,
    minimum: 0,
  })

  /**
   * The price of the fertilizer.
   * @type {number}
   * @memberof CreateFertilizerDto
   * @example 5.99
   */
  @ApiProperty({
    description: 'The price of the fertilizer',
    type: Number,
    minimum: 0,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  @IsOptional()
  price?: number;
}
