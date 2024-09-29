import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateElementDto } from './dto/update-element.dto';
import {
  Element,
  ElementDocument,
  Fertilizer,
  FertilizerDocument,
} from 'src/schemas/fertilizer.schema';

@Injectable()
export class ElementService {
  private readonly logger = new Logger(ElementService.name);
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
    @InjectModel(Element.name)
    private readonly elementModel: Model<ElementDocument>,
  ) {}

  async create(
    fertilizerId: string,
    createElementDto: UpdateElementDto,
  ): Promise<Element> {
    const fertilizer = await this.fertilizerModel.findById(fertilizerId);
    if (!fertilizer) {
      throw new NotFoundException(
        `Fertilizer with ID ${fertilizerId} not found`,
      );
    }

    const newElement = await this.elementModel.create(createElementDto);
    fertilizer.elements.push(newElement);
    await fertilizer.save();
    return newElement;
  }

  async findOne(fertilizerId: string, elementId: string): Promise<Element> {
    const fertilizer = await this.fertilizerModel.findById(fertilizerId);
    if (!fertilizer) {
      throw new NotFoundException(
        `Fertilizer with ID ${fertilizerId} not found`,
      );
    }

    const element = fertilizer.elements.find(
      (e) => e._id.toString() == elementId,
    );
    if (!element) {
      throw new NotFoundException(`Element with ID ${elementId} not found`);
    }

    return element;
  }

  async update(
    fertilizerId: string,
    elementId: string,
    updateElementDto: UpdateElementDto,
  ): Promise<Element> {
    try {
      const fertilizer = await this.fertilizerModel.findOne({
        _id: fertilizerId,
      });
      if (!fertilizer) {
        throw new NotFoundException(
          `Element with ID ${elementId} not found in fertilizer with ID ${fertilizerId}`,
        );
      }
      const element: Element = fertilizer.elements.find(
        (e) => e._id.toString() == elementId,
      );
      if (!element) {
        throw new NotFoundException(
          `Element with ID ${elementId} not found in fertilizer with ID ${fertilizerId}`,
        );
      }
      element.concentration = updateElementDto.concentration;
      await fertilizer.save();
      this.logger.debug(element);
      return element;
    } catch (e) {
      new NotFoundException(
        { message: e.message },
        `Element with ID ${elementId} not found`,
      );
    }
  }

  async remove(fertilizerId: string, elementId: string): Promise<Element> {
    const fertilizer = await this.fertilizerModel.findById(fertilizerId);
    if (!fertilizer) {
      throw new NotFoundException(
        `Fertilizer with ID ${fertilizerId} not found`,
      );
    }

    const element = fertilizer.elements.find(
      (e) => e._id.toString() == elementId,
    );
    if (!element) {
      throw new NotFoundException(`Element with ID ${elementId} not found`);
    }
    await fertilizer.save();
    return element;
  }
}
