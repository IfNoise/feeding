import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  FertilizerUnit,
  FertilizerUnitDocument,
} from '../schemas/fertilizer-unit.schema';

/**
 * Service class for managing fertilizer units.
 */
@Injectable()
export class FertilizerUnitService {
  /**
   * Constructor for the FertilizerUnitService class.
   * @param fertilizerUnitModel - The model for the FertilizerUnit schema.
   * @returns An instance of the FertilizerUnitService class.
   */
  constructor(
    @InjectModel(FertilizerUnit.name)
    private readonly fertilizerUnitModel: Model<FertilizerUnitDocument>,
  ) {}

  /**
   * Creates a new fertilizer unit.
   * @param createFertilizerUnitDto - The data transfer object containing fertilizer unit details.
   * @returns The newly created fertilizer unit.
   */
  async createFertilizerUnit(
    createFertilizerUnitDto: any,
  ): Promise<FertilizerUnit> {
    const createdFertilizerUnit = new this.fertilizerUnitModel(
      createFertilizerUnitDto,
    );
    return createdFertilizerUnit.save();
  }

  /**
   * Finds all fertilizer units.
   * @returns An array of all fertilizer units.
   */
  async findAll(): Promise<FertilizerUnit[]> {
    return this.fertilizerUnitModel.find().exec();
  }

  /**
   * Finds a fertilizer unit by ID.
   * @param id - The ID of the fertilizer unit.
   * @returns The fertilizer unit with the specified ID.
   */
  async findOne(id: string): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel.findById(id);
  }

  /**
   * Updates a fertilizer unit.
   * @param id - The ID of the fertilizer unit.
   * @param updateFertilizerUnitDto - The data transfer object containing the updated fertilizer unit details.
   * @returns The updated fertilizer unit.
   */
  async updateFertilizerUnit(
    id: string,
    updateFertilizerUnitDto: any,
  ): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel
      .findByIdAndUpdate(id, updateFertilizerUnitDto, { new: true })
      .exec();
  }

  /**
   * Deletes a fertilizer unit.
   * @param id - The ID of the fertilizer unit.
   * @returns The deleted fertilizer unit.
   */
  async deleteFertilizerUnit(id: string): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel.findByIdAndDelete(id).exec();
  }
}
