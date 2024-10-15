import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element, ElementDocument } from 'src/schemas/element.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';
import { elementBase } from 'src/shared/data/elementBase';
import { elementForm } from '../shared/types/elementForm';
import { baseElement } from '../shared/types/baseElement';
import { baseIon } from 'src/shared/types/baseIon';

/**
 * Service class for managing elements in a fertilizer.
 */
@Injectable()
export class ElementService {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger(ElementService.name);
  /**
   *
   * @param fertilizerModel
   * @param elementModel
   */
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
    @InjectModel(Element.name)
    private readonly elementModel: Model<ElementDocument>,
  ) {}

  /**
   * Creates a new element and adds it to a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param createElementDto - The data transfer object containing element details.
   * @returns The newly created element.
   * @throws NotFoundException if the fertilizer is not found.
   */
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
    await this.calculateComposition(fertilizer);
    return newElement;
  }

  /**
   * Finds all elements in a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @returns The elements in the fertilizer.
   * @throws NotFoundException if the fertilizer is not found.
   */
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

  /**
   * Updates an element in a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param elementId - The ID of the element to update.
   * @param updateElementDto - The data transfer object containing updated element details.
   * @returns The updated element.
   * @throws NotFoundException if the fertilizer or element is not found.
   */
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
      await this.calculateComposition(fertilizer);
      this.logger.debug(element);
      return element;
    } catch (e) {
      new NotFoundException(
        { message: e.message },
        `Element with ID ${elementId} not found`,
      );
    }
  }

  /**
   * Removes an element from a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param elementId - The ID of the element to remove.
   * @returns The removed element.
   * @throws NotFoundException if the fertilizer or element is not found.
   */

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
    await this.calculateComposition(fertilizer);
    return element;
  }

  /**
   * Calculates the composition of a fertilizer.
   * @param fertilizer - The fertilizer to calculate the composition for.
   * @returns The updated fertilizer.
   * @throws NotFoundException if there is an error during the calculation.
   */
  async calculateComposition(
    fertilizer: FertilizerDocument,
  ): Promise<Fertilizer> {
    try {
      const content: { element: string; concentration: number }[] = [];
      let kationes: number = 0;
      let aniones: number = 0;
      fertilizer.elements.map(async (element: Element) => {
        const baseElement: baseElement = elementBase.find(
          (el: baseElement) => el.name === element.name,
        );
        const baseForm: elementForm = baseElement.forms.find(
          (el: elementForm) => el.symbol === element.form,
        );
        const baseIone: baseIon = baseForm.ione;
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

        const elementConcentration: number =
          element.concentration * 10 * (baseElement.mMass / baseForm.mMass);
        content.push({
          element: baseElement.symbol,
          concentration: elementConcentration,
        });
        if (baseIone) {
          const ionesConcentration: number = Math.abs(
            elementConcentration * baseIone.charge,
          );

          if (baseIone.charge > 0) {
            kationes += ionesConcentration;
          } else {
            aniones += ionesConcentration;
          }
        }
      });

      this.logger.debug(`Kationes: ${kationes}`);
      this.logger.debug(`Aniones: ${aniones}`);
      fertilizer.kationes = kationes;
      fertilizer.aniones = aniones;
      fertilizer.content = content;
      return fertilizer.save();
    } catch (error) {
      this.logger.error(error.message);
      throw new NotFoundException(error.message);
    }
  }
}
