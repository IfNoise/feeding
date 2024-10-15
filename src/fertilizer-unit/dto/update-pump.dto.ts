import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Data transfer object for updating a pump.
 */
export class UpdatePumpDto {
  /**
   * The name of the pump.
   */
  @ApiProperty({
    description: 'The name of the pump.',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * The minimum flow rate of the pump.
   */
  @ApiProperty({
    description: 'The minimum flow rate of the pump.',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  minFlowRate?: number;

  /**
   * The maximum flow rate of the pump.
   */
  @ApiProperty({
    description: 'The maximum flow rate of the pump.',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  maxFlowRate?: number;

  /**
   * The concentrate of the pump.
   */
  @ApiProperty({
    description: 'The concentrate of the pump.',
    type: String,
  })
  @IsString()
  @IsOptional()
  concentrate?: string;

  /**
   * The flow rate of the pump.
   */
  @ApiProperty({
    description: 'The flow rate of the pump.',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  flowRate?: number;

  /**
   * The factor of the pump.
   */
  @ApiProperty({
    description: 'The factor of the pump.',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  factor?: number;
}
