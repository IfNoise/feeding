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
  UseInterceptors,
} from '@nestjs/common';
import { ElementService } from './element.service';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element } from 'src/schemas/element.schema';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Fertilizer } from 'src/schemas/fertilizer.schema';
import { CalculationInterceptor } from 'src/shared/interceptors/calculation.interceptor';

/**
 * Controller class for managing elements in a fertilizer.
 */
@ApiTags('Fertilizer/Elements')
@Controller('fertilizers/:fertilizerId/elements')
@UseInterceptors(CalculationInterceptor)
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
  @ApiOperation({ summary: 'Создать новый элемент для удобрения' })
  @ApiParam({ name: 'fertilizerId', description: 'ID удобрения' })
  @ApiBody({ type: UpdateElementDto })
  @ApiResponse({
    status: 201,
    description: 'Элемент успешно создан',
    type: Element,
  })
  @ApiResponse({
    status: 404,
    description: 'Удобрение не найдено',
  })
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
  @ApiOperation({ summary: 'Получить элемент по ID' })
  @ApiParam({ name: 'fertilizerId', description: 'ID удобрения' })
  @ApiParam({ name: 'elementId', description: 'ID элемента' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает элемент',
    type: Element,
  })
  @ApiResponse({
    status: 404,
    description: 'Элемент или удобрение не найдены',
  })
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
  @ApiOperation({ summary: 'Обновить элемент по ID' })
  @ApiParam({ name: 'fertilizerId', description: 'ID удобрения' })
  @ApiParam({ name: 'elementId', description: 'ID элемента' })
  @ApiBody({ type: UpdateElementDto })
  @ApiResponse({
    status: 200,
    description: 'Элемент успешно обновлен',
    type: Element,
  })
  @ApiResponse({
    status: 404,
    description: 'Элемент или удобрение не найдены',
  })
  @Patch(':elementId')
  @UsePipes(ValidationPipe)
  async update(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
    @Body() updateElementDto: UpdateElementDto,
  ): Promise<Fertilizer> {
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
  @ApiOperation({ summary: 'Удалить элемент по ID' })
  @ApiParam({ name: 'fertilizerId', description: 'ID удобрения' })
  @ApiParam({ name: 'elementId', description: 'ID элемента' })
  @ApiResponse({
    status: 200,
    description: 'Элемент успешно удален',
    type: Element,
  })
  @ApiResponse({
    status: 404,
    description: 'Элемент или удобрение не найдены',
  })
  @Delete(':elementId')
  async remove(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
  ): Promise<Fertilizer> {
    return this.elementService.remove(fertilizerId, elementId);
  }
}
