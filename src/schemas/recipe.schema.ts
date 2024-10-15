import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number })
  N: number;

  @Prop({ type: Number })
  P: number;

  @Prop({ type: Number })
  K: number;

  @Prop({ type: Number })
  Ca: number;

  @Prop({ type: Number })
  Mg: number;

  @Prop({ type: Number })
  S: number;

  @Prop({ type: Number })
  Fe: number;

  @Prop({ type: Number })
  Mn: number;

  @Prop({ type: Number })
  Zn: number;

  @Prop({ type: Number })
  Cu: number;

  @Prop({ type: Number })
  B: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
export type RecipeDocument = Recipe & Document;
