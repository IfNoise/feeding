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
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing fertilizers.
 */
@ApiTags('Fertilizers')
@Controller('fertilizers')
export class FertilizerController {
  /**
   * Constructor for the FertilizerController class.
   * @param fertilizerService - The service class for managing fertilizers.
   * @returns An instance of the FertilizerController class.
   */
  constructor(private readonly fertilizerService: FertilizerService) {}

  /**
   * Creates a new fertilizer.
   * @param createFertilizerDto - The data transfer object containing fertilizer details.
   * @returns The newly created fertilizer.
   * @throws InternalServerErrorException if the fertilizer is not created.
   */
  @Post()
  async createFertilizer(@Body() createFertilizerDto: any) {
    try {
      return await this.fertilizerService.createFertilizer(createFertilizerDto);
    } catch {
      throw new InternalServerErrorException('Failed to create fertilizer');
    }
  }

  /**
   * Finds all fertilizers.
   * @returns An array of all fertilizers.
   * @throws InternalServerErrorException if the fertilizers are not retrieved
   * successfully.
   * @throws NotFoundException if no fertilizers are found.
   */
  @Get()
  async findAll() {
    try {
      return await this.fertilizerService.findAll();
    } catch {
      throw new InternalServerErrorException('Failed to retrieve fertilizers');
    }
  }

  /**
   * Finds a single fertilizer by ID.
   * @param params - The ID of the fertilizer.
   * @returns The fertilizer
   * @throws NotFoundException if the fertilizer is not found.
   * @throws InternalServerErrorException if the fertilizer is not retrieved.
   * successfully.
   */
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

  /**
   * Updates a fertilizer.
   * @param id  The ID of the fertilizer.
   * @param updateFertilizerDto The data transfer object containing fertilizer details.
   * @returns The updated fertilizer.
   * @throws InternalServerErrorException if the fertilizer is not updated.
   */
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

  /**
   * Deletes a fertilizer.
   * @param id - The ID of the fertilizer.
   * @returns The deleted fertilizer.
   * @throws InternalServerErrorException if the fertilizer is not deleted.
   */
  @Delete(':id')
  async deleteFertilizer(@Param('id') id: string) {
    try {
      return await this.fertilizerService.deleteFertilizer(id);
    } catch {
      throw new InternalServerErrorException('Failed to delete fertilizer');
    }
  }
}
