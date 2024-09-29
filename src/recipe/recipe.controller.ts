import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async createRecipe(@Body() createRecipeDto: any) {
    try {
      return await this.recipeService.createRecipe(createRecipeDto);
    } catch {
      throw new HttpException('Error creating recipe', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.recipeService.findAll();
    } catch {
      throw new HttpException('Error fetching recipes', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.recipeService.findOne(id);
    } catch {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async updateRecipe(@Param('id') id: string, @Body() updateRecipeDto: any) {
    try {
      return await this.recipeService.updateRecipe(id, updateRecipeDto);
    } catch {
      throw new HttpException('Error updating recipe', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string) {
    try {
      return await this.recipeService.deleteRecipe(id);
    } catch {
      throw new HttpException('Error deleting recipe', HttpStatus.BAD_REQUEST);
    }
  }
}
