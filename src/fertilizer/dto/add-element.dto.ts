import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsMongoId, Max, Min, IsString } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Data transfer object for adding an element to a fertilizer.
 * @export
 * @class AddElementDto
 */
export class AddElementDto {
  /**
   * The ID of the element to add to the fertilizer.
   * @type {Types.ObjectId}
   * @memberof AddElementDto
   * @example {60f790f3b311f83d1f4f3f3d}
   */
  @ApiProperty({
    name: '_id',
    description: 'The ID of the element to add to the fertilizer',
    type: String,
    example: '60f790f3b311f83d1f4f3f3d',
  })
  @IsMongoId()
  _id: Types.ObjectId;

  /**
   * The name of the element.
   * @type {string}
   * @memberof AddElementDto
   * @example 'Nitrogen'
   */
  @ApiProperty({
    name: 'name',
    description: 'Name of the element',
    type: String,
    example: 'Nitrogen',
  })
  @IsString()
  name: string;

  /**
   * The concentration of the element in the fertilizer in percent.
   * @type {number}
   * @memberof AddElementDto
   * @example 10
   */
  @ApiProperty({
    name: 'concentration',
    description: 'Concentration of the element in the fertilizer in percent',
    type: Number,
    example: 10,
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  concentration: number;
}
