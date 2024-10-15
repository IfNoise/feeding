import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

/**
 * Element schema.
 */
@Schema()
export class Element {
  /**
   * The ID of the element.
   * @type {Types.ObjectId}
   * @required
   * @example {60f790f3b311f83d1f4f3f3d}
   */
  @ApiProperty({
    description: 'The ID of the element.',
    type: String,
    example: '60f790f3b311f83d1f4f3f3d',
  })
  _id: Types.ObjectId;

  /**
   * The name of the element.
   * @type {string}
   * @required
   * @example 'Nitrogen'
   */
  @ApiProperty({
    description: 'The name of the element.',
    type: String,
    example: 'Nitrogen',
  })
  @Prop({ required: true })
  name: string;

  /**
   * The concentration of the element in the fertilizer in percent.
   * @type {number}
   * @required
   */
  @ApiProperty({
    description: 'Concentration of the element in the fertilizer in percent',
    type: Number,
    example: 10,
  })
  @Prop({ required: true })
  concentration: number;

  /**
   * The form of the element.
   * @type {string}
   * @required
   * @example 'NO3'
   */
  @ApiProperty({
    description: 'Form of the element',
    type: String,
    example: 'NO3',
  })
  @Prop({ required: true })
  form: string;
}
export const ElementSchema = SchemaFactory.createForClass(Element);
export type ElementDocument = Element & Document;
