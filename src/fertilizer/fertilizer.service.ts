import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { CreateFertilizerDto } from './dto/create-fertilizer.dto';
import { Fertilizer, FertilizerDocument } from '../schemas/fertilizer.schema';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';

@Injectable()
export class FertilizerService {
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
  ) {}
  // ... existing methods

  async createFertilizer(
    createFertilizerDto: CreateFertilizerDto,
  ): Promise<Fertilizer> {
    const newFertilizer =
      await this.fertilizerModel.create(createFertilizerDto);
    return newFertilizer.save();
  }

  async findAll(): Promise<Fertilizer[]> {
    return this.fertilizerModel.find().exec();
  }

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

  async calculateComposition(id: string): Promise<Fertilizer> {
    try {
      const fertilizer = await this.fertilizerModel.findById(id);
      if (!fertilizer) {
        throw new NotFoundException(`Fertilizer with ID ${id} not found`);
      }
      const totalConcentration = fertilizer.elements.reduce(
        (acc, el) => acc + el.concentration,
        0,
      );
      fertilizer.elements.forEach((el) =>
        fertilizer.content.push({
          element: el.name,
          concentration: (el.concentration / totalConcentration) * 100,
        }),
      );
      return fertilizer.save();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
