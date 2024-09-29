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

@Controller('concentrates')
export class ConcentrateController {
  constructor(private readonly concentrateService: ConcentrateService) {}

  @Post()
  create(@Body() createConcentrateDto: CreateConcentrateDto) {
    return this.concentrateService.create(createConcentrateDto);
  }

  @Get()
  findAll() {
    return this.concentrateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.concentrateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConcentrateDto: UpdateConcentrateDto,
  ) {
    return this.concentrateService.update(id, updateConcentrateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.concentrateService.remove(id);
  }
}
