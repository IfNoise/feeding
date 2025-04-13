import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFertilizerDto } from './dto/create-fertilizer.dto';
import { Fertilizer, FertilizerDocument } from '../schemas/fertilizer.schema';
import { Element, ElementDocument } from '../schemas/element.schema';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';
import { baseElement } from '../shared/types/baseElement';
import { elementForm } from '../shared/types/elementForm';
import { solution } from '../shared/types/solution';
import {
  calculateElementConcentration,
  calculateElectricalConductivity,
  IonConductivity,
} from '../shared/utils/element-calculations';

/**
 * Service class for managing fertilizers.
 */
@Injectable()
export class FertilizerService {
  private readonly logger = new Logger(FertilizerService.name);

  /**
   * Constructor for the FertilizerService class.
   * @param fertilizerModel - The model for the Fertilizer schema.
   * @param elementModel - The model for the Element schema.
   */
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
    @InjectModel(Element.name)
    private readonly elementModel: Model<ElementDocument>,
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
    await newFertilizer.save();

    // Автоматический расчет состава при создании
    if (newFertilizer.elements && newFertilizer.elements.length > 0) {
      await this.calculateSolution(newFertilizer);
    }

    return newFertilizer;
  }

  /**
   * Finds all fertilizers.
   * @returns An array of all fertilizers.
   */
  async findAll(): Promise<Fertilizer[]> {
    return this.fertilizerModel.find().exec();
  }

  /**
   * Finds a fertilizer by ID.
   * @param id - The ID of the fertilizer.
   * @returns The fertilizer with the specified ID.
   * @throws NotFoundException if the fertilizer is not found.
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

      // Автоматический пересчет состава после обновления
      if (updatedFertilizer.elements && updatedFertilizer.elements.length > 0) {
        await this.calculateSolution(updatedFertilizer);
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

  /**
   * Рассчитывает содержание элементов и электропроводность в конечном растворе
   * @param fertilizer удобрение для расчета
   */
  async calculateSolution(fertilizer: FertilizerDocument) {
    try {
      const elementBase = await import('../shared/data/elementBase').then(
        (module) => module.elementBase,
      );
      const elements = await this.elementModel.find({
        _id: { $in: fertilizer.elements },
      });

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

        // Используем общую функцию для расчета концентрации
        const result = calculateElementConcentration(
          baseElement,
          baseForm,
          element.concentration,
        );

        // Для калия добавляем подробное логирование
        if (baseElement.symbol === 'K') {
          const purityFactor = baseElement.mMass / baseForm.mMass;
          const atomFactor = baseForm.ione?.atomCount || 1;

          this.logger.debug(
            `Калий: форма ${baseForm.symbol}, исходная концентрация: ${element.concentration}%, ` +
              `пересчетная концентрация: ${result.concentration.toFixed(2)} мг/л`,
          );
          this.logger.debug(
            `Формула расчета для калия: (${element.concentration} / 100) * ` +
              `${(purityFactor * atomFactor).toFixed(4)} * 1000 = ${result.concentration.toFixed(2)} мг/л`,
          );
        }

        content.push({
          element: result.element,
          concentration: result.concentration,
        });

        if (baseForm.ione) {
          // Добавляем к общему балансу ионов
          if (baseForm.ione.charge > 0) {
            kationes += result.equivalentConcentration;
          } else {
            aniones += result.equivalentConcentration;
          }

          // Добавляем информацию для расчета электропроводности
          if (baseForm.ione.сonductivityCoefficient) {
            ions.push({
              concentration: result.molarConcentration,
              conductivityCoefficient: baseForm.ione.сonductivityCoefficient,
            });
          }
        }
      });

      // Формируем объект solution
      const solutionInstance = new solution();
      solutionInstance.elements = content;
      solutionInstance.kationes = kationes;
      solutionInstance.aniones = aniones;

      // Рассчитываем электропроводность
      const EC = calculateElectricalConductivity(ions);
      solutionInstance.EC = EC;

      // Для отладки
      this.logger.debug(
        `Расчетная электропроводность: ${EC.toFixed(2)} мСм/см`,
      );
      this.logger.debug(`Катионы: ${kationes.toFixed(4)} моль экв/л`);
      this.logger.debug(`Анионы: ${aniones.toFixed(4)} моль экв/л`);

      // Проверка ионного баланса
      if (kationes > 0 && aniones > 0) {
        const ionBalance =
          (Math.abs(kationes - aniones) / ((kationes + aniones) / 2)) * 100;

        if (ionBalance > 5) {
          this.logger.warn(`Дисбаланс ионов: ${ionBalance.toFixed(2)}%`);
        } else {
          this.logger.debug(`Баланс ионов в норме: ${ionBalance.toFixed(2)}%`);
        }
      }

      fertilizer.solution = solutionInstance;
      return fertilizer.save();
    } catch (error) {
      this.logger.error(`Error calculating solution: ${error.message}`);
      throw new BadRequestException(
        `Failed to calculate solution: ${error.message}`,
      );
    }
  }
}
