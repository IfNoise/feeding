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

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ddweed.org/SurinAgro'),
    MongooseModule.forFeature([
      { name: FertilizerUnit.name, schema: FertilizerUnitSchema },
      { name: Pump.name, schema: PumpSchema },
      { name: Water.name, schema: WaterSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Fertilizer.name, schema: FertilizerSchema },
      { name: Element.name, schema: ElementSchema },
      { name: Concentrate.name, schema: ConcentrateSchema },
      { name: Ion.name, schema: IonSchema },
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
