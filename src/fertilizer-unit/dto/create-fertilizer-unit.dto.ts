import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * Data transfer object for creating a fertilizer unit.
 */
export class CreateFertilizerUnitDto {
  /**
   * The name of the fertilizer unit.
   */
  @ApiProperty({
    description: 'The name of the fertilizer unit.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The description of the fertilizer unit.
   */
  @ApiProperty({
    description: 'The description of the fertilizer unit.',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * The price of the fertilizer unit.
   */
  @ApiProperty({
    description: 'The price of the fertilizer unit.',
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
