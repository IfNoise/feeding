import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { NotFoundException, BadRequestException } from '@nestjs/common';
import {
  FertilizerUnit,
  FertilizerUnitDocument,
  Pump,
  PumpDocument,
} from 'src/schemas/fertilizer-unit.schema';
import { UpdatePumpDto } from './dto/update-pump.dto';
import {
  Concentrate,
  ConcentrateDocument,
} from 'src/schemas/concentrate.schema';

/**
 * Service class for managing pumps in a fertilizer unit.
 */
@Injectable()
export class PumpService {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger(PumpService.name);

  /**
   * Constructor for the PumpService class.
   * @param pumpModel - The model for the Pump schema.
   * @param concentrateModel - The model for the Concentrate schema.
   * @param fertilizerUnitModel - The model for the FertilizerUnit schema.
   * @returns An instance of the PumpService class.
   */
  constructor(
    @InjectModel(Pump.name)
    private readonly pumpModel: Model<PumpDocument>,
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<ConcentrateDocument>,
    @InjectModel(FertilizerUnit.name)
    private readonly fertilizerUnitModel: Model<FertilizerUnitDocument>,
  ) {}

  /**
   * Creates a new pump and associates it with a fertilizer unit.
   * @param fertilizerUnitId - The ID of the fertilizer unit.
   * @param createPumpDto - The data transfer object containing pump details.
   * @returns The newly created pump.
   * @throws NotFoundException if the fertilizer unit is not found.
   * @throws BadRequestException if there is an error during creation.
   */
  async create(fertilizerUnitId: string, createPumpDto: any): Promise<Pump> {
    try {
      this.logger.debug(`Finding fertilizer unit with ID: ${fertilizerUnitId}`);
      const fertilizerUnit: FertilizerUnitDocument =
        await this.fertilizerUnitModel.findById(fertilizerUnitId);
      if (!fertilizerUnit) {
        throw new NotFoundException('Fertilizer unit not found');
      }
      this.logger.debug(
        `Fertilizer unit found: ${JSON.stringify(fertilizerUnit)}`,
      );
      const newPump: PumpDocument = await this.pumpModel.create(createPumpDto);
      this.logger.debug(`New pump created: ${JSON.stringify(newPump)}`);
      fertilizerUnit.pumps.push(newPump);
      await fertilizerUnit.save();
      return newPump;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Finds a specific pump within a fertilizer unit.
   * @param fertilizerUnitId - The ID of the fertilizer unit.
   * @param pumpId - The ID of the pump to find.
   * @returns The found pump.
   * @throws NotFoundException if the fertilizer unit or pump is not found.
   * @throws BadRequestException if there is an error during the search.
   */
  async findOne(fertilizerUnitId: string, pumpId: string): Promise<Pump> {
    try {
      const fertilizerUnit: FertilizerUnitDocument =
        await this.fertilizerUnitModel.findById(fertilizerUnitId);
      if (!fertilizerUnit) {
        throw new NotFoundException('Fertilizer unit not found');
      }
      const pump: Pump = fertilizerUnit.pumps.find(
        (p) => p._id.toString() === pumpId,
      );
      if (!pump) {
        throw new NotFoundException('Pump not found');
      }
      return pump;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Finds all pumps within a fertilizer unit.
   * @param fertilizerUnitId - The ID of the fertilizer unit.
   * @returns An array of pumps.
   * @throws NotFoundException if the fertilizer unit is not found.
   * @throws BadRequestException if there is an error during the search.
   */
  async findAll(fertilizerUnitId: string): Promise<Pump[]> {
    try {
      const fertilizerUnit =
        await this.fertilizerUnitModel.findById(fertilizerUnitId);
      if (!fertilizerUnit) {
        throw new NotFoundException('Fertilizer unit not found');
      }
      return fertilizerUnit.pumps;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Updates a specific pump within a fertilizer unit.
   * @param fertilizerUnitId - The ID of the fertilizer unit.
   * @param pumpId - The ID of the pump to update.
   * @param updatePumpDto - The data transfer object containing updated pump details.
   * @returns The updated pump.
   * @throws NotFoundException if the fertilizer unit or pump is not found.
   * @throws BadRequestException if there is an error during the update.
   */
  async update(
    fertilizerUnitId: string,
    pumpId: string,
    updatePumpDto: UpdatePumpDto,
  ): Promise<Pump> {
    try {
      const fertilizerUnit =
        await this.fertilizerUnitModel.findById(fertilizerUnitId);
      if (!fertilizerUnit) {
        throw new NotFoundException('Fertilizer unit not found');
      }
      const pump = fertilizerUnit.pumps.find(
        (p) => p._id.toString() === pumpId,
      );
      if (!pump) {
        throw new NotFoundException('Pump not found');
      }
      Object.keys(updatePumpDto).forEach((key) => {
        pump[key] = updatePumpDto[key];
      });
      await fertilizerUnit.save();
      await this.calculateComposition(fertilizerUnit);
      return pump;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Deletes a specific pump from a fertilizer unit.
   * @param fertilizerUnitId - The ID of the fertilizer unit.
   * @param pumpId - The ID of the pump to delete.
   * @returns The deleted pump.
   * @throws NotFoundException if the fertilizer unit or pump is not found.
   * @throws BadRequestException if there is an error during deletion.
   */
  async delete(fertilizerUnitId: string, pumpId: string): Promise<Pump> {
    try {
      const fertilizerUnit =
        await this.fertilizerUnitModel.findById(fertilizerUnitId);
      if (!fertilizerUnit) {
        throw new NotFoundException('Fertilizer unit not found');
      }
      const pumpIndex = fertilizerUnit.pumps.findIndex(
        (p) => p._id.toString() === pumpId,
      );
      if (pumpIndex === -1) {
        throw new NotFoundException('Pump not found');
      }
      const pump = fertilizerUnit.pumps[pumpIndex];
      fertilizerUnit.pumps.splice(pumpIndex, 1);
      await fertilizerUnit.save();
      return pump;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Calculates the elemental composition and ionic balance of the solution
   * @param fertilizerUnit
   * @returns The updated fertilizer unit
   * @throws NotFoundException if a concentrate is not found
   */

  async calculateComposition(
    fertilizerUnit: FertilizerUnitDocument,
  ): Promise<FertilizerUnitDocument> {
    const elements = await Promise.all(
      fertilizerUnit.pumps.map(async (pump: Pump) => {
        const concentrate: ConcentrateDocument = await this.concentrateModel
          .findById(pump.concentrate)
          .exec();
        if (!concentrate) {
          throw new NotFoundException('Concentrate not found');
        }
        return concentrate.content.map((element) => {
          return {
            element: element.element,
            concentration:
              element.concentration * pump.flowRate * pump.factor * 10,
          };
        });
      }),
    ).then((concentrates) => concentrates.flat());

    elements.reduce((acc, curr) => {
      const existing = acc.find((item) => item.element === curr.element);
      if (existing) {
        existing.concentration += curr.concentration;
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);

    fertilizerUnit.solution.elements = elements;
    return fertilizerUnit.save();
  }
}
