import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Ion {
  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  charge: number;

  @Prop({ required: true, min: 0 })
  concentration: number;
}

export type IonDocument = Ion & Document;
export const IonSchema = SchemaFactory.createForClass(Ion);
