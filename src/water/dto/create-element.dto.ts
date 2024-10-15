import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

/**
 * Data Transfer Object for creating a new element.
 *
 * @class CreateElementDto
 */
export class CreateElementDto {

  /**
   * The name of the element.
   * @type {string}
   * @memberof CreateElementDto
   * @example 'Calcium'
   */
  @ApiProperty({
    description: 'The name of the element.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The symbol of the element.
   * @type {string}
   * @memberof CreateElementDto
   * @example 'Ca'
   */
  @ApiProperty({
    description: 'The symbol of the element.',
    type: String,
  })
  @IsString()
  @IsOptional()
  form: string;

  /**
   * The atomic number of the element.
   * @type {number}
   * @memberof CreateElementDto
   * @example 20
   */
  @ApiProperty({
    description: 'The atomic number of the element.',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  concentration: number;
}
