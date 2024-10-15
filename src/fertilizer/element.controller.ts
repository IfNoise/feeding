import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Delete,
  Patch,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from 'src/schemas/element.schema';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing elements in a fertilizer.
 */
@ApiTags('Fertilizer/Elements')
@Controller('fertilizers/:fertilizerId/elements')
export class ElementController {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger(ElementController.name);

  /**
   * Constructor for the ElementController class.
   * @param elementService - The service class for managing elements.
   * @returns An instance of the ElementController
   * class.
   */
  constructor(private readonly elementService: ElementService) {}

  /**
   * Creates a new element and adds it to a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param createElementDto - The data transfer object containing element details.
   * @returns The newly created element.
   */
  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Param('fertilizerId') fertilizerId: string,
    @Body() createElementDto: UpdateElementDto,
  ): Promise<Element> {
    return this.elementService.create(fertilizerId, createElementDto);
  }

  /**
   * Finds all elements in a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @returns An array of all elements in the fertilizer.
   */
  @Get(':elementId')
  async findOne(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
  ): Promise<Element> {
    return this.elementService.findOne(fertilizerId, elementId);
  }

  /**
   * Updates an element in a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param elementId - The ID of the element.
   * @param updateElementDto - The data transfer object containing the updated element details.
   * @returns The updated element.
   * @throws NotFoundException if the element is not found.
   * @throws BadRequestException if the element is not updated.
   */
  @Patch(':elementId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
    @Body() updateElementDto: UpdateElementDto,
  ): Promise<Element> {
    return this.elementService.update(
      fertilizerId,
      elementId,
      updateElementDto,
    );
  }

  /**
   * Deletes an element from a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param elementId - The ID of the element.
   * @returns The deleted element.
   * @throws NotFoundException if the element is not found.
   */
  @Delete(':elementId')
  async remove(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
  ): Promise<Element> {
    return this.elementService.remove(fertilizerId, elementId);
  }
}
