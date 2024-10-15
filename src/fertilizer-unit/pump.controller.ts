import { Controller } from '@nestjs/common';
import { PumpService } from './pump.service';
import { CreatePumpDto } from './dto/create-pump.dto';
import {
  Body,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UpdatePumpDto } from './dto/update-pump.dto';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller class for managing pumps in a fertilizer unit.
 */
@ApiTags('Pumps')
@Controller('fertilizer-units/:fertilizerUnitId/pumps')
export class PumpController {
  /**
   * Constructor for the PumpController class.
   * @param pumpService - The service class for managing pumps.
   * @returns An instance of the PumpController class.
   */
  constructor(private readonly pumpService: PumpService) {}

  /**
   * creates a new pump and associates it with a fertilizer unit.
   * @param id Fertilizer unit ID
   * @param createPumpDto Pump details
   * @returns The newly created pump.
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createPump(
    @Param('fertilizerUnitId') id: string,
    @Body() createPumpDto: CreatePumpDto,
  ) {
    return this.pumpService.create(id, createPumpDto);
  }

  /**
   * Finds all pumps in a fertilizer unit.
   * @param id Fertilizer unit ID
   * @returns An array of all pumps in the fertilizer unit.
   */
  @Get(':pumpId')
  findOne(
    @Param('fertilizerUnitId') id: string,
    @Param('pumpId') pumpId: string,
  ) {
    return this.pumpService.findOne(id, pumpId);
  }

  /**
   * Updates a pump.
   * @param id Fertilizer unit ID
   * @param pumpId Pump ID
   * @param updatePumpDto Updated pump details
   * @returns The updated pump.
   */
  @Patch(':pumpId')
  @UsePipes(new ValidationPipe({ transform: true }))
  updatePump(
    @Param('fertilizerUnitId') fertilizerUnitId: string,
    @Param('pumpId') pumpId: string,
    @Body() updatePumpDto: UpdatePumpDto,
  ) {
    return this.pumpService.update(fertilizerUnitId, pumpId, updatePumpDto);
  }

  /**
   * Deletes a pump.
   * @param id Fertilizer unit ID
   * @param pumpId Pump ID
   */
  @Delete(':pumpId')
  deletePump(
    @Param('fertilizerUnitId') id: string,
    @Param('pumpId') pumpId: string,
  ) {
    return this.pumpService.delete(id, pumpId);
  }
}
