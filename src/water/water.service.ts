import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Water } from '../schemas/water.schema';

@Injectable()
export class WaterService {
  constructor(
    @InjectModel(Water.name) private readonly waterModel: Model<Water>,
  ) {}

  async createWater(createWaterDto: any): Promise<Water> {
    const createdWater = new this.waterModel(createWaterDto);
    return createdWater.save();
  }

  async findAll(): Promise<Water[]> {
    return this.waterModel.find().exec();
  }

  async findOne(id: string): Promise<Water> {
    return this.waterModel.findById(id).exec();
  }

  async updateWater(id: string, updateWaterDto: any): Promise<Water> {
    return this.waterModel
      .findByIdAndUpdate(id, updateWaterDto, { new: true })
      .exec();
  }

  async deleteWater(id: string): Promise<Water> {
    return this.waterModel.findByIdAndDelete(id).exec();
  }

  // Функции для манипуляции массивом elements

  async addElement(id: string, element: any): Promise<Water> {
    const water = await this.waterModel.findById(id);
    water.elements.push(element);
    return water.save();
  }

  async updateElement(
    id: string,
    elementId: string,
    elementData: any,
  ): Promise<Water> {
    const water = await this.waterModel.findById(id);
    const elementIndex = water.elements.findIndex(
      (el) => el._id.toString() === elementId,
    );
    if (elementIndex > -1) {
      water.elements[elementIndex] = {
        ...water.elements[elementIndex],
        ...elementData,
      };
    }
    return water.save();
  }

  async removeElement(id: string, elementId: string): Promise<Water> {
    const water = await this.waterModel.findById(id);
    water.elements = water.elements.filter(
      (el) => el._id.toString() !== elementId,
    );
    return water.save();
  }
}
