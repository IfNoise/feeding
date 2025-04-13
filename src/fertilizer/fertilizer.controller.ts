import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FertilizerService } from './fertilizer.service';
import { CreateFertilizerDto } from './dto/create-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Fertilizer, FertilizerDocument } from '../schemas/fertilizer.schema';

@ApiTags('fertilizers')
@Controller('fertilizers')
export class FertilizerController {
  constructor(private readonly fertilizerService: FertilizerService) {}

  @ApiOperation({ summary: 'Создать новое удобрение' })
  @ApiBody({ type: CreateFertilizerDto })
  @ApiResponse({
    status: 201,
    description: 'Удобрение успешно создано',
    type: Fertilizer,
  })
  @Post()
  create(@Body() createFertilizerDto: CreateFertilizerDto) {
    return this.fertilizerService.createFertilizer(createFertilizerDto);
  }

  @ApiOperation({ summary: 'Получить все удобрения' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает все удобрения',
    type: [Fertilizer],
  })
  @Get()
  findAll() {
    return this.fertilizerService.findAll();
  }

  @ApiOperation({ summary: 'Получить удобрение по ID' })
  @ApiParam({ name: 'id', description: 'ID удобрения' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает удобрение',
    type: Fertilizer,
  })
  @ApiResponse({
    status: 404,
    description: 'Удобрение не найдено',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fertilizerService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить удобрение по ID' })
  @ApiParam({ name: 'id', description: 'ID удобрения' })
  @ApiBody({ type: UpdateFertilizerDto })
  @ApiResponse({
    status: 200,
    description: 'Удобрение успешно обновлено',
    type: Fertilizer,
  })
  @ApiResponse({
    status: 404,
    description: 'Удобрение не найдено',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFertilizerDto: UpdateFertilizerDto,
  ) {
    return this.fertilizerService.updateFertilizer(id, updateFertilizerDto);
  }

  @ApiOperation({ summary: 'Удалить удобрение по ID' })
  @ApiParam({ name: 'id', description: 'ID удобрения' })
  @ApiResponse({
    status: 200,
    description: 'Удобрение успешно удалено',
    type: Fertilizer,
  })
  @ApiResponse({
    status: 404,
    description: 'Удобрение не найдено',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fertilizerService.deleteFertilizer(id);
  }

  @ApiOperation({ summary: 'Рассчитать раствор для удобрения' })
  @ApiParam({ name: 'id', description: 'ID удобрения' })
  @ApiResponse({
    status: 200,
    description: 'Раствор успешно рассчитан',
    type: Fertilizer,
  })
  @ApiResponse({
    status: 404,
    description: 'Удобрение не найдено',
  })
  @Post(':id/calculate-solution')
  async calculateSolution(@Param('id') id: string) {
    const fertilizer = (await this.fertilizerService.findOne(
      id,
    )) as FertilizerDocument;
    return this.fertilizerService.calculateSolution(fertilizer);
  }
}
