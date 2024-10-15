import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Data transfer object for adding a fertilizer to a concentrate.
 */
export class AddFertilizerDto {
  /**
   * The ID of the fertilizer to add to the concentrate.
   */
  @ApiProperty({
    description: 'The ID of the fertilizer to add to the concentrate.',
    type: String,
    example: '60f790f3b311f83d1f4f3f3d',
  })
  @IsString()
  fertilizer: Types.ObjectId;

  /**
   * The concentration of the fertilizer to add to the concentrate.
   * @type number
   * @example 100
   * @minimum 0
   */
  @ApiProperty({
    description:
      'The concentration of the fertilizer to add to the concentrate g/l.',
    type: Number,
    example: 100,
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  concentration: number;
}
