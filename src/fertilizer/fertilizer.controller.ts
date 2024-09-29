import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { FertilizerService } from './fertilizer.service';
import { IdParamDto } from 'src/shared/dto/idparam.dto';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Controller('fertilizers')
export class FertilizerController {
  // existing methods...
  constructor(private readonly fertilizerService: FertilizerService) {}

  @Post()
  async createFertilizer(@Body() createFertilizerDto: any) {
    try {
      return await this.fertilizerService.createFertilizer(createFertilizerDto);
    } catch {
      throw new InternalServerErrorException('Failed to create fertilizer');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.fertilizerService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to retrieve fertilizers');
    }
  }

  @Get(':id')
  async findOne(@Param('id') params: IdParamDto) {
    try {
      const fertilizer = await this.fertilizerService.findOne(params.id);
      if (!fertilizer) {
        throw new NotFoundException('Fertilizer not found');
      }
      return fertilizer;
    } catch {
      throw new InternalServerErrorException('Failed to retrieve fertilizer');
    }
  }

  @Patch(':id')
  async updateFertilizer(
    @Param('id') id: string,
    @Body() updateFertilizerDto: any,
  ) {
    try {
      return await this.fertilizerService.updateFertilizer(
        id,
        updateFertilizerDto,
      );
    } catch {
      throw new InternalServerErrorException('Failed to update fertilizer');
    }
  }

  @Delete(':id')
  async deleteFertilizer(@Param('id') id: string) {
    try {
      return await this.fertilizerService.deleteFertilizer(id);
    } catch {
      throw new InternalServerErrorException('Failed to delete fertilizer');
    }
  }
}
