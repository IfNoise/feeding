import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FertilizerService } from './fertilizer.service';
import { AddFertilizerDto } from './dto/add-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';
import { ApiTags } from '@nestjs/swagger';
import { CalculationInterceptor } from 'src/shared/interceptors/calculation.interceptor';

/**
 * Controller class for managing fertilizers.
 */
@ApiTags('Concentrate/Fertilizers')
@Controller({ path: 'concentrates/:concentrateId/fertilizers', version: '1' })
@UseInterceptors(CalculationInterceptor)
export class FertilizerController {
  /**
   * Constructor for the FertilizerController class.
   * @param fertilizerService - The service class for managing fertilizers.
   * @returns An instance of the FertilizerController class.
   */
  constructor(private readonly fertilizerService: FertilizerService) {}

  /**
   * Finds all fertilizers for a given concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @returns An array of all fertilizers for the given concentrate.
   */
  @Get()
  findAll(@Param('concentrateId') concentrateId: string): Promise<any> {
    return this.fertilizerService.findAll(concentrateId);
  }

  /**
   * Adds a new fertilizer to a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param addFertilizerDto - The data transfer object containing fertilizer details.
   * @returns The newly added fertilizer.
   */
  @Post()
  addFertilizer(
    @Param('concentrateId') concentrateId: string,
    @Body() addFertilizerDto: AddFertilizerDto,
  ) {
    return this.fertilizerService.addFertilizer(
      concentrateId,
      addFertilizerDto,
    );
  }

  /**
   * Updates a fertilizer.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @param updateFertilizerDto - The data transfer object containing updated fertilizer details.
   * @returns The updated fertilizer.
   */
  @Patch(':fertilizerId')
  updateFertilizer(
    @Param('concentrateId') concentrateId: string,
    @Param('fertilizerId') fertilizerId: string,
    @Body() updateFertilizerDto: UpdateFertilizerDto,
  ) {
    return this.fertilizerService.updateFertilizer(
      concentrateId,
      fertilizerId,
      updateFertilizerDto,
    );
  }

  /**
   * Deletes a fertilizer.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @returns The deleted fertilizer.
   */
  @Delete(':fertilizerId')
  removeFertilizer(
    @Param('concentrateId') concentrateId: string,
    @Param('fertilizerId') fertilizerId: string,
  ) {
    return this.fertilizerService.removeFertilizer(concentrateId, fertilizerId);
  }
}
