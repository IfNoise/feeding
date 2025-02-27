import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';

/**
 * Service class for managing recipes.
 */
@Injectable()
export class RecipeService {
  /**
   * Constructor for the RecipeService class.
   * @param recipeModel - The model for the Recipe schema.
   * @returns An instance of the RecipeService class.
   */
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>,
  ) {}

  /**
   * Creates a new recipe.
   * @param createRecipeDto - The data transfer object containing recipe details.
   * @returns The newly created recipe.
   */
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    try {
      const createdRecipe = new this.recipeModel(createRecipeDto);
      return await createdRecipe.save();
    } catch (error) {
      throw new Error(`Error creating recipe: ${error.message}`);
    }
  }

  /**
   * Finds all recipes.
   * @returns An array of all recipes.
   */
  async findAll(): Promise<Recipe[]> {
    try {
      return await this.recipeModel.find().exec();
    } catch (error) {
      throw new Error(`Error finding recipes: ${error.message}`);
    }
  }

  /**
   * Finds a recipe by ID.
   * @param id - The ID of the recipe.
   * @returns The recipe with the specified ID.
   */
  async findOne(id: string): Promise<Recipe> {
    try {
      return await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding recipe with id ${id}: ${error.message}`);
    }
  }

  /**
   * Updates a recipe.
   * @param id - The ID of the recipe.
   * @param updateRecipeDto - The data transfer object containing the updated recipe details.
   * @returns The updated recipe.
   */
  async updateRecipe(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    try {
      return await this.recipeModel
        .findByIdAndUpdate(id, updateRecipeDto, { new: true })
        .exec();
    } catch (error) {
      throw new Error(`Error updating recipe with id ${id}: ${error.message}`);
    }
  }

  /**
   * Deletes a recipe.
   * @param id - The ID of the recipe.
   * @returns The deleted recipe.
   */
  async deleteRecipe(id: string): Promise<Recipe> {
    try {
      return await this.recipeModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error(`Error deleting recipe with id ${id}: ${error.message}`);
    }
  }
}
