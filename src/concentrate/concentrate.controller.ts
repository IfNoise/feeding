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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import {
  Concentrate,
  ConcentrateDocument,
} from '../schemas/concentrate.schema';

@ApiTags('concentrates')
@Controller('concentrates')
export class ConcentrateController {
  constructor(private readonly concentrateService: ConcentrateService) {}

  @ApiOperation({ summary: 'Создать новый концентрат' })
  @ApiBody({ type: CreateConcentrateDto })
  @ApiResponse({
    status: 201,
    description: 'Концентрат успешно создан',
    type: Concentrate,
  })
  @Post()
  create(@Body() createConcentrateDto: CreateConcentrateDto) {
    return this.concentrateService.create(createConcentrateDto);
  }

  @ApiOperation({ summary: 'Получить все концентраты' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает список всех концентратов',
    type: [Concentrate],
  })
  @Get()
  findAll() {
    return this.concentrateService.findAll();
  }

  @ApiOperation({ summary: 'Получить концентрат по ID' })
  @ApiParam({ name: 'id', description: 'ID концентрата' })
  @ApiResponse({
    status: 200,
    description: 'Возвращает концентрат',
    type: Concentrate,
  })
  @ApiResponse({
    status: 404,
    description: 'Концентрат не найден',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concentrateService.findOne(id);
  }

  @ApiOperation({ summary: 'Обновить концентрат по ID' })
  @ApiParam({ name: 'id', description: 'ID концентрата' })
  @ApiBody({ type: UpdateConcentrateDto })
  @ApiResponse({
    status: 200,
    description: 'Концентрат успешно обновлен',
    type: Concentrate,
  })
  @ApiResponse({
    status: 404,
    description: 'Концентрат не найден',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConcentrateDto: UpdateConcentrateDto,
  ) {
    return this.concentrateService.update(id, updateConcentrateDto);
  }

  @ApiOperation({ summary: 'Удалить концентрат по ID' })
  @ApiParam({ name: 'id', description: 'ID концентрата' })
  @ApiResponse({
    status: 200,
    description: 'Концентрат успешно удален',
    type: Concentrate,
  })
  @ApiResponse({
    status: 404,
    description: 'Концентрат не найден',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concentrateService.remove(id);
  }

  @ApiOperation({ summary: 'Рассчитать содержание концентрата' })
  @ApiParam({ name: 'id', description: 'ID концентрата' })
  @ApiResponse({
    status: 200,
    description: 'Расчет содержания концентрата выполнен успешно',
    type: Concentrate,
  })
  @ApiResponse({
    status: 404,
    description: 'Концентрат не найден или входящие удобрения не найдены',
  })
  @Post(':id/calculate')
  async calculateContent(@Param('id') id: string) {
    const concentrate = (await this.concentrateService.findOne(
      id,
    )) as ConcentrateDocument;
    return this.concentrateService.calculateConcentrateContent(concentrate);
  }
}
