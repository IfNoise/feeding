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
import { Element } from 'src/schemas/fertilizer.schema';

@Controller('fertilizers/:fertilizerId/elements')
export class ElementController {
  private readonly logger = new Logger(ElementController.name);
  constructor(private readonly elementService: ElementService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Param('fertilizerId') fertilizerId: string,
    @Body() createElementDto: UpdateElementDto,
  ): Promise<Element> {
    return this.elementService.create(fertilizerId, createElementDto);
  }

  @Get(':elementId')
  async findOne(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
  ): Promise<Element> {
    return this.elementService.findOne(fertilizerId, elementId);
  }

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

  @Delete(':elementId')
  async remove(
    @Param('fertilizerId') fertilizerId: string,
    @Param('elementId') elementId: string,
  ): Promise<Element> {
    return this.elementService.remove(fertilizerId, elementId);
  }
}
