import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fertilizer } from './fertilizer.schema';

@Schema()
export class Concentrate {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([
    {
      fertilizer: { type: Types.ObjectId, ref: Fertilizer },
      concentration: { type: Number, required: true },
    },
  ])
  fertilizers: Array<{ fertilizer: string; concentration: number }>;

  @Prop([
    {
      element: String,
      concentration: Number,
    },
  ])
  content: [{ element: string; concentration: string }];
}

export const ConcentrateSchema = SchemaFactory.createForClass(Concentrate);
export type ConcentrateDocument = Concentrate & Document;
