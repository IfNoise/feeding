import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { FertilizerUnitService } from './fertilizer-unit.service';
import { UpdateFertilizerUnitDto } from './dto/update-fertilizer-unit.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing fertilizer units.
 */
@ApiTags('Fertilizer Units')
@Controller('fertilizer-units')
export class FertilizerUnitController {
  constructor(private readonly fertilizerUnitService: FertilizerUnitService) {}

  /**
   * Creates a new fertilizer unit.
   * @param createFertilizerUnitDto - The data transfer object containing fertilizer unit details.
   * @returns The newly created fertilizer unit.
   * @throws BadRequestException if the fertilizer unit is not found.
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createFertilizerUnit(@Body() createFertilizerUnitDto: any) {
    return this.fertilizerUnitService.createFertilizerUnit(
      createFertilizerUnitDto,
    );
  }

  /**
   *  Finds all fertilizer units.
   * @returns An array of all fertilizer units.
   */
  @Get()
  findAll() {
    return this.fertilizerUnitService.findAll();
  }

  /**
   * Finds a single fertilizer unit by ID.
   * @param id - The ID of the fertilizer unit.
   * @returns The fertilizer unit
   * @throws BadRequestException if the fertilizer unit is not found.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fertilizerUnitService.findOne(id);
  }

  /**
   * Updates a fertilizer unit.
   * @param id  The ID of the fertilizer unit.
   * @param updateFertilizerUnitDto The data transfer object containing fertilizer unit details.
   * @returns The updated fertilizer unit.
   */
  @Patch(':id')
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

  /**
   * Deletes a fertilizer unit.
   * @param id - The ID of the fertilizer unit.
   * @returns The deleted fertilizer unit.
   */
  @Delete(':id')
  deleteFertilizerUnit(@Param('id') id: string) {
    return this.fertilizerUnitService.deleteFertilizerUnit(id);
  }
}
