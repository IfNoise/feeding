import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Element, ElementSchema } from './element.schema';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Fertilizer {
  @ApiProperty({
    description: 'Название удобрения',
    example: 'Кальциевая селитра',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Тип удобрения',
    enum: ['solid', 'liquid'],
    example: 'solid',
  })
  @Prop({ enum: ['solid', 'liquid'], default: 'solid' })
  type: string;

  @ApiProperty({ description: 'Описание удобрения', example: '15.5-0-0+19CaO' })
  @Prop()
  description: string;

  @ApiProperty({ description: 'Цена за кг', example: 1.5 })
  @Prop()
  price: number; // price per kg

  @ApiProperty({ description: 'Элементы в составе удобрения', type: [Element] })
  @Prop({ type: [ElementSchema], default: [] })
  elements: Element[];

  @ApiProperty({
    description: 'Содержание элементов после расчета',
    example: [{ element: 'N', concentration: 155 }],
  })
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

  @ApiProperty({ description: 'Сумма анионов, моль экв/л', example: 0.01 })
  @Prop({
    type: Number,
  })
  aniones: number;

  @ApiProperty({ description: 'Сумма катионов, моль экв/л', example: 0.01 })
  @Prop({
    type: Number,
  })
  kationes: number;

  @ApiProperty({ description: 'Характеристики раствора', type: 'object' })
  @Prop({ type: Object, default: {} })
  solution: any;
}

export const FertilizerSchema = SchemaFactory.createForClass(Fertilizer);
export type FertilizerDocument = Fertilizer & Document;
