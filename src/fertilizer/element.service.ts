import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateElementDto } from './dto/update-element.dto';
import { Element, ElementDocument } from 'src/schemas/element.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';
import { elementForm } from '../shared/types/elementForm';
import { baseElement } from '../shared/types/baseElement';
import {
  calculateElementConcentration,
  IonConductivity,
} from '../shared/utils/element-calculations';

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
   * Constructor for ElementService
   * @param fertilizerModel - Model for Fertilizer data
   * @param elementModel - Model for Element data
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

    // Автоматически пересчитываем состав удобрения после добавления элемента
    await this.calculateComposition(fertilizer);

    return newElement;
  }

  /**
   * Finds an element in a fertilizer.
   * @param fertilizerId - The ID of the fertilizer.
   * @param elementId - The ID of the element.
   * @returns The element with the specified ID.
   * @throws NotFoundException if the fertilizer or element is not found.
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
  ): Promise<Fertilizer> {
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

      if (updateElementDto.name) element.name = updateElementDto.name;
      if (updateElementDto.form) element.form = updateElementDto.form;
      if (updateElementDto.concentration !== undefined)
        element.concentration = updateElementDto.concentration;

      await fertilizer.save();

      // Автоматически пересчитываем состав удобрения после обновления элемента

      return await this.calculateComposition(fertilizer);
    } catch (e) {
      throw new NotFoundException(
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
  async remove(fertilizerId: string, elementId: string): Promise<Fertilizer> {
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

    fertilizer.elements = fertilizer.elements.filter(
      (e) => e._id.toString() !== elementId,
    );

    await fertilizer.save();

    // Автоматически пересчитываем состав удобрения после удаления элемента
    return await this.calculateComposition(fertilizer);
  }

  /**
   * Calculates the composition of a fertilizer.
   * @param fertilizer - The fertilizer to calculate the composition for.
   * @returns The updated fertilizer.
   * @throws NotFoundException if there is an error during the calculation.
   */
  async calculateComposition(fertilizer: FertilizerDocument) {
    try {
      this.logger.debug('Calculating composition');
      const elements = await this.elementModel.find({
        _id: { $in: fertilizer.elements },
      });
      this.logger.debug(`Elements: ${JSON.stringify(elements)}`);
      const elementBase = await import('../shared/data/elementBase').then(
        (module) => module.elementBase,
      );

      let kationes = 0;
      let aniones = 0;
      const content = [];
      const ions: IonConductivity[] = [];

      elements.forEach((element) => {
        const baseElement = elementBase.find(
          (el: baseElement) => el.name === element.name,
        );
        const baseForm = baseElement.forms.find(
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

        // Используем общую функцию для расчета концентрации
        this.logger.debug(
          `Calculating concentration for element: ${element.name}, form: ${element.form}, concentration: ${element.concentration}`,
        );
        const result = calculateElementConcentration(
          baseElement,
          baseForm,
          element.concentration,
        );
        this.logger.debug(`Result: ${JSON.stringify(result)}`);
        // Добавляем в список содержимого
        content.push({
          element: result.element,
          concentration: result.concentration,
        });

        // Добавляем информацию об ионах для расчета баланса
        if (baseForm.ione) {
          if (baseForm.ione.charge > 0) {
            kationes += result.equivalentConcentration;
          } else {
            aniones += result.equivalentConcentration;
          }
        }
      });

      // Обновляем поля удобрения
      fertilizer.kationes = kationes;
      fertilizer.aniones = aniones;
      fertilizer.content = content;

      // Сохраняем изменения в базе данных
      this.logger.debug(
        `Обновлен состав удобрения: ${JSON.stringify(content, null, 2)} элементов`,
      );
      return fertilizer.save();
    } catch (error) {
      this.logger.error(`Ошибка при расчете состава: ${error.message}`);
      throw new NotFoundException(error.message);
    }
  }
}
