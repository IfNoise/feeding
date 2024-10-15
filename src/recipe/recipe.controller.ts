import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing recipes.
 */
@ApiTags('Recipes')
@Controller('recipes')
export class RecipeController {
  /**
   * Constructor for the RecipeController class.
   * @param recipeService - The service class for managing recipes.
   * @returns An instance of the RecipeController class.
   */
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Creates a new recipe.
   * @param createRecipeDto - The data transfer object containing recipe details.
   * @returns The newly created recipe.
   * @throws BadRequestException if the recipe is not found.
   */
  @Post()
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    try {
      return await this.recipeService.createRecipe(createRecipeDto);
    } catch {
      throw new HttpException('Error creating recipe', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Finds all recipes.
   * @returns An array of all recipes.
   * @throws BadRequestException if the recipes are not found.
   */
  @Get()
  async findAll() {
    try {
      return await this.recipeService.findAll();
    } catch {
      throw new HttpException('Error fetching recipes', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Finds a single recipe by ID.
   * @param id - The ID of the recipe.
   * @returns The recipe
   * @throws BadRequestException if the recipe is not found.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.recipeService.findOne(id);
    } catch {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Updates a recipe.
   * @param id - The ID of the recipe.
   * @param updateRecipeDto - The data transfer object containing updated recipe details.
   * @returns The updated recipe.
   * @throws BadRequestException if the recipe is not updated.
   */
  @Patch(':id')
  async updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    try {
      return await this.recipeService.updateRecipe(id, updateRecipeDto);
    } catch {
      throw new HttpException('Error updating recipe', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a recipe.
   * @param id - The ID of the recipe.
   * @returns The deleted recipe.
   * @throws BadRequestException if the recipe is not deleted.
   */
  @Delete(':id')
  async deleteRecipe(@Param('id') id: string) {
    try {
      return await this.recipeService.deleteRecipe(id);
    } catch {
      throw new HttpException('Error deleting recipe', HttpStatus.BAD_REQUEST);
    }
  }
}
