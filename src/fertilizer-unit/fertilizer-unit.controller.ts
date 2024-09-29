import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { UpdatePumpDto } from './dto/update-pump.dto';
import { CreatePumpDto } from './dto/create-pump.dto';
import { UpdateFertilizerUnitDto } from './dto/update-fertilizer-unit.dto';

@Controller('fertilizer-units')
export class FertilizerUnitController {
  constructor(private readonly fertilizerUnitService: FertilizerUnitService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createFertilizerUnit(@Body() createFertilizerUnitDto: any) {
    return this.fertilizerUnitService.createFertilizerUnit(
      createFertilizerUnitDto,
    );
  }

  @Get()
  findAll() {
    return this.fertilizerUnitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fertilizerUnitService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateFertilizerUnit(
    @Param('id') id: string,
    @Body() updateFertilizerUnitDto: UpdateFertilizerUnitDto,
  ) {
    return this.fertilizerUnitService.updateFertilizerUnit(
      id,
      updateFertilizerUnitDto,
    );
  }

  @Delete(':id')
  deleteFertilizerUnit(@Param('id') id: string) {
    return this.fertilizerUnitService.deleteFertilizerUnit(id);
  }

  // Маршруты для манипуляции массивом pumps

  @Post(':id/pumps')
  @UsePipes(new ValidationPipe({ transform: true }))
  addPump(@Param('id') id: string, @Body() pump: CreatePumpDto) {
    return this.fertilizerUnitService.addPump(id, pump);
  }

  @Put(':id/pumps/:pumpId')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePump(
    @Param('id') id: string,
    @Param('pumpId') pumpId: string,
    @Body() pumpData: UpdatePumpDto,
  ) {
    return this.fertilizerUnitService.updatePump(id, pumpId, pumpData);
  }

  @Delete(':id/pumps/:pumpId')
  removePump(@Param('id') id: string, @Param('pumpId') pumpId: string) {
    return this.fertilizerUnitService.removePump(id, pumpId);
  }
}
