import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConcentrateService } from './concentrate.service';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing concentrates.
 */
@ApiTags('Concentrates')
@Controller('concentrates')
export class ConcentrateController {
  /**
   * Constructor for the ConcentrateController class.
   * @param concentrateService - The service class for managing concentrates.
   * @returns An instance of the ConcentrateController class.
   */
  constructor(private readonly concentrateService: ConcentrateService) {}

  /**
   * Creates a new concentrate.
   * @param createConcentrateDto - The data transfer object containing concentrate details.
   * @returns The newly created concentrate.
   */
  @Post()
  create(@Body() createConcentrateDto: CreateConcentrateDto) {
    return this.concentrateService.create(createConcentrateDto);
  }

  /**
   * Finds all concentrates.
   * @returns An array of all concentrates.
   */
  @Get()
  findAll() {
    return this.concentrateService.findAll();
  }

  /**
   * Finds a single concentrate by ID.
   * @param id - The ID of the concentrate.
   * @returns The concentrate
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concentrateService.findOne(id);
  }

  /**
   * Updates a concentrate.
   * @param id - The ID of the concentrate.
   * @param updateConcentrateDto - The data transfer object containing updated concentrate details.
   * @returns The updated concentrate.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConcentrateDto: UpdateConcentrateDto,
  ) {
    return this.concentrateService.update(id, updateConcentrateDto);
  }

  /**
   * Deletes a concentrate.
   * @param id - The ID of the concentrate.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concentrateService.remove(id);
  }
}
