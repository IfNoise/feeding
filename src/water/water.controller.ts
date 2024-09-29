import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { WaterService } from './water.service';
import { UpdateWaterDto } from './dto/update-water.dto';
import { IdParamDto } from 'src/shared/dto/idparam.dto';

@Controller('waters')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}

  @Post()
  createWater(@Body() createWaterDto: any) {
    return this.waterService.createWater(createWaterDto);
  }

  @Get()
  findAll() {
    return this.waterService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParamDto) {
    return this.waterService.findOne(params.id);
  }

  @Put(':id')
  updateWater(
    @Param() params: IdParamDto,
    @Body() updateWaterDto: UpdateWaterDto,
  ) {
    return this.waterService.updateWater(params.id, updateWaterDto);
  }

  @Delete(':id')
  deleteWater(@Param() params: IdParamDto) {
    return this.waterService.deleteWater(params.id);
  }

  // Маршруты для манипуляции массивом elements

  @Post(':id/elements')
  addElement(@Param('id') id: string, @Body() element: any) {
    return this.waterService.addElement(id, element);
  }

  @Put(':id/elements/:elementId')
  updateElement(
    @Param('id') id: string,
    @Param('elementId') elementId: string,
    @Body() elementData: any,
  ) {
    return this.waterService.updateElement(id, elementId, elementData);
  }

  @Delete(':id/elements/:elementId')
  removeElement(
    @Param('id') id: string,
    @Param('elementId') elementId: string,
  ) {
    return this.waterService.removeElement(id, elementId);
  }
}
