import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for updating a fertilizer.
 */
export class UpdateFertilizerDto {
  @ApiProperty({
    description: 'The new concentration',
    type: Number,
    example: 150,
  })
  @Prop({ required: true })
  concentration: number;
}
