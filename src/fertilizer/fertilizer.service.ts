import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateFertilizerDto } from './dto/create-fertilizer.dto';
import { Fertilizer, FertilizerDocument } from '../schemas/fertilizer.schema';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';

/**
 * Service class for managing fertilizers.
 */
@Injectable()
export class FertilizerService {
  /**
   * Constructor for the FertilizerService class.
   * @param fertilizerModel - The model for the Fertilizer schema.
   * @returns An instance of the FertilizerService class.
   */
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
  ) {}

  /**
   * Creates a new fertilizer.
   * @param createFertilizerDto - The data transfer object containing fertilizer details.
   * @returns The newly created fertilizer.
   */
  async createFertilizer(
    createFertilizerDto: CreateFertilizerDto,
  ): Promise<Fertilizer> {
    const newFertilizer =
      await this.fertilizerModel.create(createFertilizerDto);
    return newFertilizer.save();
  }

  /**
   *  Finds all fertilizers.
   * @returns An array of all fertilizers.
   */
  async findAll(): Promise<Fertilizer[]> {
    return this.fertilizerModel.find().exec();
  }

  /**
   * Finds a fertilizer by ID.
   * @param id - The ID of the fertilizer.
   * @returns The fertilizer with the specified ID.
   */
  async findOne(id: string): Promise<Fertilizer> {
    try {
      const fertilizer = await this.fertilizerModel.findById(id).exec();
      if (!fertilizer) {
        throw new NotFoundException(`Fertilizer with ID ${id} not found`);
      }
      return fertilizer;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Updates a fertilizer.
   * @param id - The ID of the fertilizer.
   * @param updateFertilizerDto - The data transfer object containing the updated fertilizer details.
   * @returns The updated fertilizer.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async updateFertilizer(
    id: string,
    updateFertilizerDto: UpdateFertilizerDto,
  ): Promise<Fertilizer> {
    try {
      const updatedFertilizer = await this.fertilizerModel
        .findByIdAndUpdate(id, updateFertilizerDto, { new: true })
        .exec();
      if (!updatedFertilizer) {
        throw new NotFoundException(`Fertilizer with ID ${id} not found`);
      }
      return updatedFertilizer;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * Deletes a fertilizer.
   * @param id - The ID of the fertilizer.
   * @returns The deleted fertilizer.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async deleteFertilizer(id: string): Promise<Fertilizer> {
    try {
      const deletedFertilizer = await this.fertilizerModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedFertilizer) {
        throw new NotFoundException(`Fertilizer with ID ${id} not found`);
      }
      return deletedFertilizer;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
