import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Data transfer object for creating a pump.
 */
export class CreatePumpDto {
  /**
   * The name of the pump.
   * @example 'Pump 1'
   */
  @ApiProperty({
    description: 'The name of the pump.',
    type: String,
    example: 'Pump 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The description of the pump.
   * @example 'This is pump 1'
   */
  @ApiProperty({
    description: 'The description of the pump.',
    type: String,
    example: 'This is pump 1',
  })
  @IsString()
  description: string;

  /**
   * The minimum flow rate of the pump.
   * @example 0.4
   */
  @ApiProperty({
    description: 'The minimum flow rate of the pump.',
    type: Number,
    example: 0.4,
  })
  @IsNumber()
  @IsNotEmpty()
  minFlowRate: number;

  /**
   * The maximum flow rate of the pump.
   * @example 100
   */
  @ApiProperty({
    description: 'The maximum flow rate of the pump.',
    type: Number,
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  maxFlowRate: number;

  /**
   * The concentrate of the pump.
   * @example 'Concentrate 1'
   */
  @ApiProperty({
    description: 'The concentrate of the pump.',
    type: Types.ObjectId,
    example: 'Concentrate 1',
  })
  @IsString()
  @IsNotEmpty()
  concentrate: Types.ObjectId;

  /**
   * The flow rate of the pump.
   * @example 1.0
   */
  @ApiProperty({
    description: 'The flow rate of the pump.',
    type: Number,
    example: 1.0,
  })
  @IsNumber()
  @IsNotEmpty()
  flowRate: number;

  /**
   * The factor of the pump.
   * @example 1.0
   */
  @ApiProperty({
    description: 'The factor of the pump.',
    type: Number,
    example: 1.0,
  })
  @IsNumber()
  @IsNotEmpty()
  factor: number;
}
