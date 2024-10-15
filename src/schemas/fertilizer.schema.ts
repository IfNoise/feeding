import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Element, ElementSchema } from './element.schema';

@Schema()
export class Fertilizer {
  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['solid', 'liquid'], default: 'solid' })
  type: string;

  @Prop()
  description: string;

  @Prop()
  price: number; // price per kg

  @Prop({ type: [ElementSchema], default: [] })
  elements: Element[];

  @Prop({
    type: [
      {
        element: { type: String, required: true },
        concentration: { type: Number, required: true },
      },
    ],
    default: [],
  })
  content: { element: string; concentration: number }[];

  @Prop({
    type: Number,
  })
  aniones: number;

  @Prop({
    type: Number,
  })
  kationes: number;
}

export const FertilizerSchema = SchemaFactory.createForClass(Fertilizer);
export type FertilizerDocument = Fertilizer & Document;
