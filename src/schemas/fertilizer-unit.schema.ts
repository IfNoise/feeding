import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Ion } from './ion.schema';

@Schema()
export class Pump {
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
export type PumpDocument = Pump & Document;

@Schema()
export class Solution {
  @Prop({ type: [{ type: Object }], default: [], _id: false })
  elements: Record<string, any>[];

  @Prop({ type: Object, default: { kationes: [], aniones: [] } })
  iones: { kationes: Ion[]; aniones: Ion[] };

  @Prop()
  kationes: number;

  @Prop()
  aniones: number;

  @Prop()
  EC: number;
}
export const SolutionSchema = SchemaFactory.createForClass(Solution);
export type SolutionDocument = Solution & Document;

@Schema()
export class FertilizerUnit {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Water' })
  water: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Recipe' })
  recipe: Types.ObjectId;

  @Prop({ type: [PumpSchema], default: [] })
  pumps: Pump[];

  @Prop({ type: SolutionSchema, default: {}, _id: false })
  solution: Solution;
}

export const FertilizerUnitSchema =
  SchemaFactory.createForClass(FertilizerUnit);
export type FertilizerUnitDocument = FertilizerUnit & Document;
