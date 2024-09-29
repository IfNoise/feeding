import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Pump {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  minFlowRate: number; // %

  @Prop({ required: true })
  maxFlowRate: number; // %

  @Prop({ type: Types.ObjectId, ref: 'Concentrate' })
  concentrate: Types.ObjectId;

  @Prop({ required: true })
  flowRate: number; // %

  @Prop({ required: true })
  factor: number;
}
export const PumpSchema = SchemaFactory.createForClass(Pump);

@Schema()
export class FertilizerUnit {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Water' })
  water: Types.ObjectId;

  @Prop({ type: [PumpSchema], default: [] })
  pumps: Pump[];

  @Prop({ type: Object, default: {} })
  solution: Record<string, any>;
}

export const FertilizerUnitSchema =
  SchemaFactory.createForClass(FertilizerUnit);
export type FertilizerUnitDocument = FertilizerUnit & Document;
