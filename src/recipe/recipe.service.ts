import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from 'src/schemas/recipe.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  async createRecipe(createRecipeDto: any): Promise<Recipe> {
    try {
      const createdRecipe = new this.recipeModel(createRecipeDto);
      return await createdRecipe.save();
    } catch (error) {
      throw new Error(`Error creating recipe: ${error.message}`);
    }
  }

  async findAll(): Promise<Recipe[]> {
    try {
      return await this.recipeModel.find().exec();
    } catch (error) {
      throw new Error(`Error finding recipes: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Recipe> {
    try {
      return await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding recipe with id ${id}: ${error.message}`);
    }
  }

  async updateRecipe(id: string, updateRecipeDto: any): Promise<Recipe> {
    try {
      return await this.recipeModel
        .findByIdAndUpdate(id, updateRecipeDto, { new: true })
        .exec();
    } catch (error) {
      throw new Error(`Error updating recipe with id ${id}: ${error.message}`);
    }
  }

  async deleteRecipe(id: string): Promise<Recipe> {
    try {
      return await this.recipeModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting recipe with id ${id}: ${error.message}`);
    }
  }
}
