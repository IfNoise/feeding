import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { WaterService } from './water.service';
import { UpdateWaterDto } from './dto/update-water.dto';
import { IdParamDto } from 'src/shared/dto/idparam.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing water.
 */
@ApiTags('Water')
@Controller('waters')
export class WaterController {
  /**
   * Constructor for the WaterController class.
   * @param waterService - The service class for managing water.
   * @returns An instance of the WaterController class.
   */
  constructor(private readonly waterService: WaterService) {}

  /**
   * Creates a new water.
   * @param createWaterDto - The data transfer object containing water details.
   * @returns The newly created water.
   */
  @Post()
  createWater(@Body() createWaterDto: any) {
    return this.waterService.createWater(createWaterDto);
  }

  /**
   * Finds all water.
   * @returns An array of all water.
   */
  @Get()
  findAll() {
    return this.waterService.findAll();
  }

  /**
   * Finds a single water by ID.
   * @param id - The ID of the water.
   * @returns The water
   */
  @Get(':id')
  findOne(@Param() params: IdParamDto) {
    return this.waterService.findOne(params.id);
  }

  /**
   * Updates a water.
   * @param id - The ID of the water.
   * @param updateWaterDto - The data transfer object containing updated water details.
   * @returns The updated water.
   */
  @Patch(':id')
  updateWater(
    @Param() params: IdParamDto,
    @Body() updateWaterDto: UpdateWaterDto,
  ) {
    return this.waterService.updateWater(params.id, updateWaterDto);
  }

  /**
   * Deletes a water.
   * @param id - The ID of the water.
   * @returns The deleted water.
   */
  @Delete(':id')
  deleteWater(@Param() params: IdParamDto) {
    return this.waterService.deleteWater(params.id);
  }

  /**
   *  Finds all elements in a water.
   * @param id - The ID of the water.
   * @param element - The element to add to the water.
   * @returns An array of all elements in the water.
   * @throws NotFoundException if the water is not found.
   */
  @Post(':id/elements')
  addElement(@Param('id') id: string, @Body() element: any) {
    return this.waterService.addElement(id, element);
  }

  /**
   * Finds a single element in a water by ID.
   * @param id - The ID of the water.
   * @param elementId - The ID of the element.
   * @returns The element
   * @throws NotFoundException if the element is not found.
   * @throws BadRequestException if the element is not found.
   */
  @Patch(':id/elements/:elementId')
  updateElement(
    @Param('id') id: string,
    @Param('elementId') elementId: string,
    @Body() updateElementDto: UpdateElementDto,
  ) {
    return this.waterService.updateElement(id, elementId, updateElementDto);
  }

  /**
   * Deletes an element from a water.
   * @param id - The ID of the water.
   * @param elementId - The ID of the element.
   * @returns The deleted element.
   * @throws NotFoundException if the element is not found.
   */
  @Delete(':id/elements/:elementId')
  removeElement(
    @Param('id') id: string,
    @Param('elementId') elementId: string,
  ) {
    return this.waterService.removeElement(id, elementId);
  }
}
