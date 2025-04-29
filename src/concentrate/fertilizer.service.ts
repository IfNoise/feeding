import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Concentrate,
  ConcentrateDocument,
} from 'src/schemas/concentrate.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';
import { AddFertilizerDto } from './dto/add-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';

interface FertilizerReference {
  fertilizer: {
    _id: string;
    name: string;
    description: string;
  };
  concentration: number;
}

/**
 * Service class for managing fertilizers in a concentrate.
 */
@Injectable()
export class FertilizerService {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger(FertilizerService.name);
  /**
   *  Constructor for the FertilizerService class.
   * @param fertilizerModel
   * @param concentrateModel
   */
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<ConcentrateDocument>,
  ) {}

  /**
   * Finds all fertilizers in a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @returns An array of fertilizer references.
   * @throws NotFoundException if the concentrate is not found.
   */
  async findAll(concentrateId: string): Promise<FertilizerReference[]> {
    this.logger.debug(
      `Finding all fertilizers for concentrate with ID: ${concentrateId}`,
    );

    const concentrate = await this.concentrateModel
      .findById(concentrateId)
      .populate({
        path: 'fertilizers.fertilizer',
        select: 'name description _id',
      })
      .exec();

    if (!concentrate) {
      throw new NotFoundException(
        `Concentrate with ID ${concentrateId} not found`,
      );
    }

    return concentrate.fertilizers as unknown as FertilizerReference[];
  }

  /**
   * Adds a new fertilizer to a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param addFertilizerDto - The data transfer object containing fertilizer details.
   * @returns The updated concentrate.
   */
  async addFertilizer(
    concentrateId: string,
    addFertilizerDto: AddFertilizerDto,
  ): Promise<Concentrate> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    concentrate.fertilizers.push(addFertilizerDto);
    return concentrate.save();
  }

  /**
   * Updates a fertilizer in a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @param updateFertilizerDto - The data transfer object containing updated fertilizer details.
   * @returns The updated concentrate.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async updateFertilizer(
    concentrateId: string,
    fertilizerId: string,
    updateFertilizerDto: UpdateFertilizerDto,
  ): Promise<Concentrate> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    const fertilizer = concentrate.fertilizers.find(
      (f: any) => f._id == fertilizerId,
    );
    if (!fertilizer) {
      throw new NotFoundException(
        `Fertilizer with ID ${fertilizerId} not found`,
      );
    }
    fertilizer.concentration = updateFertilizerDto.concentration;
    return concentrate.save();
  }

  /**
   * Removes a fertilizer from a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @returns The updated concentrate.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async removeFertilizer(
    concentrateId: string,
    fertilizerId: string,
  ): Promise<ConcentrateDocument> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    const index = concentrate.fertilizers.findIndex(
      (f: any) => f.fertilizer == fertilizerId,
    );
    concentrate.fertilizers.splice(index, 1);
    return concentrate.save();
  }
}
