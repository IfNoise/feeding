import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FertilizerUnit } from 'src/schemas/fertilizer-unit.schema';

@Injectable()
export class FertilizerUnitService {
  constructor(
    @InjectModel(FertilizerUnit.name)
    private readonly fertilizerUnitModel: Model<FertilizerUnit>,
  ) {}

  async createFertilizerUnit(
    createFertilizerUnitDto: any,
  ): Promise<FertilizerUnit> {
    const createdFertilizerUnit = new this.fertilizerUnitModel(
      createFertilizerUnitDto,
    );
    return createdFertilizerUnit.save();
  }

  async findAll(): Promise<FertilizerUnit[]> {
    return this.fertilizerUnitModel.find().exec();
  }

  async findOne(id: string): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel.findById(id).exec();
  }

  async updateFertilizerUnit(
    id: string,
    updateFertilizerUnitDto: any,
  ): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel
      .findByIdAndUpdate(id, updateFertilizerUnitDto, { new: true })
      .exec();
  }

  async deleteFertilizerUnit(id: string): Promise<FertilizerUnit> {
    return this.fertilizerUnitModel.findByIdAndDelete(id).exec();
  }

  // Функции для манипуляции массивом pumps

  async addPump(id: string, pump: any): Promise<FertilizerUnit> {
    const fertilizerUnit = await this.fertilizerUnitModel.findById(id);
    fertilizerUnit.pumps.push(pump);
    return fertilizerUnit.save();
  }

  async updatePump(
    id: string,
    pumpId: string,
    pumpData: any,
  ): Promise<FertilizerUnit> {
    const fertilizerUnit = await this.fertilizerUnitModel.findById(id);
    const pumpIndex = fertilizerUnit.pumps.findIndex(
      (pump) => pump._id.toString() === pumpId,
    );
    if (pumpIndex > -1) {
      fertilizerUnit.pumps[pumpIndex] = {
        ...fertilizerUnit.pumps[pumpIndex],
        ...pumpData,
      };
    }
    return fertilizerUnit.save();
  }

  async removePump(id: string, pumpId: string): Promise<FertilizerUnit> {
    const fertilizerUnit = await this.fertilizerUnitModel.findById(id);
    fertilizerUnit.pumps = fertilizerUnit.pumps.filter(
      (pump) => pump._id.toString() !== pumpId,
    );
    return fertilizerUnit.save();
  }
}
