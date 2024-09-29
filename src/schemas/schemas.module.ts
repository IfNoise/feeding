import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FertilizerUnit, FertilizerUnitSchema } from './fertilizer-unit.schema';
import {
  ElementSchema,
  Fertilizer,
  FertilizerSchema,
  Element,
} from './fertilizer.schema';
import { Recipe, RecipeSchema } from './recipe.schema';
import { Water, WaterSchema } from './water.schema';
import { Concentrate, ConcentrateSchema } from './concentrate.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ddweed.org/SurinAgro'),
    MongooseModule.forFeature([
      { name: FertilizerUnit.name, schema: FertilizerUnitSchema },
      { name: Water.name, schema: WaterSchema },
      { name: Recipe.name, schema: RecipeSchema },
      { name: Fertilizer.name, schema: FertilizerSchema },
      { name: Element.name, schema: ElementSchema },
      { name: Concentrate.name, schema: ConcentrateSchema },
    ]),
  ],
  providers: [Fertilizer, Element, FertilizerUnit, Water, Recipe, Concentrate],
  exports: [
    MongooseModule,
    Fertilizer,
    Element,
    FertilizerUnit,
    Water,
    Recipe,
    Concentrate,
  ],
})
export class SchemasModule {}
