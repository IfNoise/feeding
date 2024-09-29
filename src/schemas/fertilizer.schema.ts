import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Element {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  concentration: number;
}
export const ElementSchema = SchemaFactory.createForClass(Element);

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
  })
  content: [{ element: string; concentration: number }];
}

export const FertilizerSchema = SchemaFactory.createForClass(Fertilizer);
export type FertilizerDocument = Fertilizer & Document;
export type ElementDocument = Element & Document;
