import { Injectable } from '@nestjs/common';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concentrate } from 'src/schemas/concentrate.schema';

/**
 * Concentrate service class
 */
@Injectable()
export class ConcentrateService {
  /**
   * Constructor of concentrate service class
   * @param concentrateModel
   */
  constructor(
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<Concentrate>,
  ) {}

  /**
   *  Creates a new concentrate
   * @param createConcentrateDto  - The data transfer object containing concentrate details.
   * @returns The newly created concentrate.
   * @throws Error if there is an error during creation.
   */
  create(createConcentrateDto: CreateConcentrateDto): Promise<Concentrate> {
    const newConcentrate = new this.concentrateModel(createConcentrateDto);
    return newConcentrate.save();
  }

  /**
   * Finds all concentrates
   * @returns An array of all concentrates.
   * @throws Error if there is an error during retrieval.
   * @returns An array of all concentrates.
   * @throws Error if there is an error during retrieval.
   */
  findAll(): Promise<Concentrate[]> {
    return this.concentrateModel.find();
  }

  /**
   * Finds a concentrate by ID.
   * @param id - The ID of the concentrate.
   * @returns The concentrate with the specified ID
   * @throws Error if there is an error during retrieval.
   */
  findOne(id: string): Promise<Concentrate> {
    return this.concentrateModel.findById(id);
  }

  /**
   * Updates a concentrate
   * @param id - The ID of the concentrate.
   * @param updateConcentrateDto - The data transfer object containing the updated concentrate details.
   * @returns The updated concentrate.
   */
  update(
    id: string,
    updateConcentrateDto: UpdateConcentrateDto,
  ): Promise<Concentrate> {
    return this.concentrateModel.findByIdAndUpdate(id, updateConcentrateDto, {
      new: true,
    });
  }

  /**
   * Removes a concentrate
   * @param id - The ID of the concentrate.
   * @returns The removed concentrate.
   */
  remove(id: string): Promise<Concentrate> {
    return this.concentrateModel.findByIdAndDelete(id);
  }
}
