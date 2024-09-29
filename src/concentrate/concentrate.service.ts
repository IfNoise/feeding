import { Injectable } from '@nestjs/common';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Concentrate } from 'src/schemas/concentrate.schema';

@Injectable()
export class ConcentrateService {
  constructor(
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<Concentrate>,
  ) {}

  create(createConcentrateDto: CreateConcentrateDto): Promise<Concentrate> {
    const newConcentrate = new this.concentrateModel(createConcentrateDto);
    return newConcentrate.save();
  }

  findAll(): Promise<Concentrate[]> {
    return this.concentrateModel.find();
  }

  findOne(id: string): Promise<Concentrate> {
    return this.concentrateModel.findById(id);
  }

  update(
    id: string,
    updateConcentrateDto: UpdateConcentrateDto,
  ): Promise<Concentrate> {
    return this.concentrateModel.findByIdAndUpdate(id, updateConcentrateDto, {
      new: true,
    });
  }

  remove(id: string): Promise<Concentrate> {
    return this.concentrateModel.findByIdAndDelete(id);
  }
}
