import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { RecipeService } from './recipe.service';
import { Recipe } from '../schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Model } from 'mongoose';

const mockRecipe: Recipe = {
  name: 'Test Recipe',
  N: 100,
  P: 60,
  K: 100,
  Ca: 10,
  Mg: 50,
  S: 40,
  Fe: 0.1,
  Mn: 0.02,
  Zn: 0.01,
  Cu: 0.3,
  B: 0.01,
};

const mockRecipeModel = {
  new: jest.fn().mockResolvedValue(mockRecipe),
  constructor: jest.fn().mockResolvedValue(mockRecipe),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockRecipe]),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockRecipe),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockRecipe),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockRecipe),
  }),
  create: jest.fn().mockResolvedValue(mockRecipe),
  save: jest.fn().mockResolvedValue(mockRecipe),
};

describe('RecipeService', () => {
  let service: RecipeService;
  let model: Model<Recipe>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: mockRecipeModel,
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    model = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new recipe', async () => {
    const createRecipeDto: CreateRecipeDto = {
      name: 'Test Recipe',
      N: 100,
      P: 60,
      K: 100,
      Ca: 10,
      Mg: 50,
      S: 40,
      Fe: 0.1,
      Mn: 0.02,
      Zn: 0.01,
      Cu: 0.3,
      B: 0.01,
    };
    const result = await service.createRecipe(createRecipeDto);
    expect(result).toEqual(mockRecipe);
  });

  it('should find all recipes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockRecipe]);
  });

  it('should find a recipe by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(mockRecipe);
  });

  it('should update a recipe', async () => {
    const updateRecipeDto: UpdateRecipeDto = {
      N: 100,
      P: 50,
      K: 25,
    };
    const result = await service.updateRecipe('1', updateRecipeDto);
    expect(result).toEqual({ ...mockRecipe, ...updateRecipeDto });
  });

  it('should delete a recipe', async () => {
    const result = await service.deleteRecipe('1');
    expect(result).toEqual(mockRecipe);
  });
});
