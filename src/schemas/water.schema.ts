import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Element, ElementSchema } from './element.schema';
@Schema()
export class Water {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  pH: number;

  @Prop({ required: true })
  EC: number;

  @Prop({ type: [ElementSchema], default: [] })
  elements: Element[];
  @Prop({
    type: [
      {
        element: { type: String, required: true },
        concentration: { type: Number, required: true },
      },
    ],
  })
  content: { element: string; concentration: number }[];
}
export const WaterSchema = SchemaFactory.createForClass(Water);
export type WaterDocument = Water & Document;
