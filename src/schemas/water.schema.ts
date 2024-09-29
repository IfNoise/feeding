import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Element {
  @Prop(Types.ObjectId)
  _id: Types.ObjectId;

  @Prop({ required: true })
  element: string;

  @Prop({ required: true })
  concentration: number;
}

const ElementSchema = SchemaFactory.createForClass(Element);

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
}
export const WaterSchema = SchemaFactory.createForClass(Water);
export type WaterDocument = Water & Document;
