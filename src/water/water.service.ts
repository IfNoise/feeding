import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Water, WaterDocument } from '../schemas/water.schema';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element, ElementDocument } from '../schemas/element.schema';
import { CreateElementDto } from './dto/create-element.dto';
import { baseElement } from '../shared/types/baseElement';
import { elementBase } from '../shared/data/elementBase';
import { elementForm } from '../shared/types/elementForm';

@Injectable()
export class WaterService {
  constructor(
    @InjectModel(Water.name) private readonly waterModel: Model<WaterDocument>,
    @InjectModel(Element.name)
    private readonly elementModel: Model<ElementDocument>,
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

  async addElement(
    id: string,
    createElementDto: CreateElementDto,
  ): Promise<Water> {
    const water = await this.waterModel.findById(id);
    const element = new this.elementModel(createElementDto);
    water.elements.push(element);
    return water.save();
  }

  async updateElement(
    id: string,
    elementId: string,
    updateElementDto: UpdateElementDto,
  ): Promise<Water> {
    const water = await this.waterModel.findById(id);
    const element: Element = water.elements.find(
      (el) => el._id.toString() === elementId,
    );
    if (element) {
      element.concentration = updateElementDto.concentration;
    }
    return water.save().then((water) => {
      return this.calculateComposition(water);
    });
  }

  async removeElement(id: string, elementId: string): Promise<Water> {
    const water = await this.waterModel.findById(id);
    water.elements = water.elements.filter(
      (el) => el._id.toString() !== elementId,
    );
    return water.save().then((water) => {
      return this.calculateComposition(water);
    });
  }

  async calculateComposition(water: WaterDocument): Promise<Water> {
    try {
      const content: { element: string; concentration: number }[] =
        water.elements.map((element: Element) => {
          const baseElement: baseElement = elementBase.find(
            (el: baseElement) => el.name === element.name,
          );
          const baseForm: elementForm = baseElement.forms.find(
            (el: elementForm) => el.symbol === element.form,
          );
          if (!baseElement) {
            throw new NotFoundException(
              `Base element for ${element.name} not found`,
            );
          }
          if (!baseForm) {
            throw new NotFoundException(
              `Base form for ${element.form} not found`,
            );
          }
          const concentration: number =
            ((element.concentration * baseElement.mMass) / baseForm.mMass) * 10;
          return {
            element: baseElement.symbol,
            concentration,
          };
        });
      water.content = content;
      return water.save();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
