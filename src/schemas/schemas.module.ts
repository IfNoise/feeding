import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FertilizerUnit,
  FertilizerUnitSchema,
  Pump,
  PumpSchema,
} from './fertilizer-unit.schema';
import { Element, ElementSchema } from './element.schema';
import { Fertilizer, FertilizerSchema } from './fertilizer.schema';
import { Recipe, RecipeSchema } from './recipe.schema';
import { Water, WaterSchema } from './water.schema';
import { Concentrate, ConcentrateSchema } from './concentrate.schema';
import { Ion, IonSchema } from './ion.schema';
import { ConfigService } from '@nestjs/config';
import { connectDB } from 'src/shared/utils/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: connectDB,
    }),
    MongooseModule.forFeature([
      { name: Pump.name, schema: PumpSchema },
      { name: Water.name, schema: WaterSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Fertilizer.name, schema: FertilizerSchema },
      { name: Element.name, schema: ElementSchema },
      { name: Ion.name, schema: IonSchema },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Concentrate.name,
        useFactory: () => {
          const schema = ConcentrateSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: FertilizerUnit.name,
        useFactory: () => {
          const schema = FertilizerUnitSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  providers: [
    Fertilizer,
    Element,
    Pump,
    FertilizerUnit,
    Water,
    Recipe,
    Concentrate,
    Ion,
  ],
  exports: [
    MongooseModule,
    Fertilizer,
    Element,
    FertilizerUnit,
    Pump,
    Water,
    Recipe,
    Concentrate,
    Ion,
  ],
})
export class SchemasModule {}
