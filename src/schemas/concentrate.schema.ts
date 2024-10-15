import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';

/**
 * Concentrate schema.
 */

@Schema()
export class Concentrate {
  /**
   * The name of the concentrate.
   * @type {string}
   * @required
   */
  @ApiProperty({
    description: 'The name of the concentrate.',
    type: String,
    example: 'Calcium Nitrate',
  })
  @Prop({ required: true })
  name: string;

  /**
   * The description of the concentrate.
   * @type {string}
   * @example 'A concentrate containing calcium nitrate.'
   */
  @ApiProperty({
    description: 'The description of the concentrate.',
    type: String,
    example: 'A concentrate containing calcium nitrate.',
  })
  @Prop()
  description: string;

  /**
   * The fertilizers in the concentrate.
   * @type {Array<{fertilizer: Types.ObjectId, concentration: number}>}
   */
  @ApiProperty({
    description: 'The fertilizers in the concentrate.',
    type: Array,
    items: {
      type: 'object',
      properties: {
        fertilizer: {
          type: 'string',
          example: '60f790f3b311f83d1f4f3f3d',
        },
        concentration: {
          type: 'number',
          example: 100,
        },
      },
    },
  })
  @Prop([
    {
      fertilizer: { type: Types.ObjectId },
      concentration: { type: Number, required: true },
    },
  ])
  fertilizers: Array<{ fertilizer: Types.ObjectId; concentration: number }>;

  /**
   * The content of the concentrate.
   * @type {Array<{element: string, concentration: number}>}
   */
  @ApiProperty({
    description: 'The content of the concentrate.',
    type: Array,
    items: {
      type: 'object',
      properties: {
        element: {
          type: 'string',
          example: 'Nitrogen',
        },
        concentration: {
          type: 'number',
          example: 10,
        },
      },
    },
  })
  @Prop([
    {
      element: String,
      concentration: Number,
    },
  ])
  content: Array<{ element: string; concentration: number }>;

  /**
   * The flow rate of the concentrate.
   * @type {number}
   */
  @ApiProperty({
    description: 'The flow rate of the concentrate.',
    type: Number,
  })
  @Prop({
    type: Number,
  })
  aniones: number;

  /**
   * The factor of the concentrate.
   * @type {number}
   */
  @ApiProperty({
    description: 'The factor of the concentrate.',
    type: Number,
  })
  @Prop({
    type: Number,
  })
  kationes: number;
}

/**
 * Concentrate schema.
 * @export
 * @class ConcentrateSchema
 * @extends {SchemaFactory.createForClass(Concentrate)}
 * @type {ConcentrateDocument}
 * @implements {Document}
 */
export const ConcentrateSchema = SchemaFactory.createForClass(Concentrate);

/**
 * Concentrate document.
 * @export
 * @interface ConcentrateDocument
 * @extends {Concentrate}
 * @extends {Document}
 */
export type ConcentrateDocument = Concentrate & Document;
