import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateConcentrateDto } from './dto/create-concentrate.dto';
import { UpdateConcentrateDto } from './dto/update-concentrate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Concentrate,
  ConcentrateDocument,
} from '../schemas/concentrate.schema';
import { Fertilizer, FertilizerDocument } from '../schemas/fertilizer.schema';
import { solution } from '../shared/types/solution';
import { IonConductivity } from '../shared/utils/element-calculations';

/**
 * Concentrate service class
 */
@Injectable()
export class ConcentrateService {
  private readonly logger = new Logger(ConcentrateService.name);

  /**
   * Constructor of concentrate service class
   * @param concentrateModel
   * @param fertilizerModel
   */
  constructor(
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<ConcentrateDocument>,
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
  ) {}

  /**
   *  Creates a new concentrate
   * @param createConcentrateDto  - The data transfer object containing concentrate details.
   * @returns The newly created concentrate.
   * @throws Error if there is an error during creation.
   */
  async create(
    createConcentrateDto: CreateConcentrateDto,
  ): Promise<Concentrate> {
    return this.concentrateModel.create(createConcentrateDto);
  }

  /**
   * Finds all concentrates
   * @returns An array of all concentrates.
   * @throws Error if there is an error during retrieval.
   * @returns An array of all concentrates.
   * @throws Error if there is an error during retrieval.
   */
  findAll(): Promise<Concentrate[]> {
    return this.concentrateModel.find().exec();
  }

  /**
   * Finds a concentrate by ID.
   * @param id - The ID of the concentrate.
   * @returns The concentrate with the specified ID
   * @throws Error if there is an error during retrieval.
   */
  findOne(id: string): Promise<Concentrate> {
    return this.concentrateModel.findById(id).exec();
  }

  /**
   * Updates a concentrate
   * @param id - The ID of the concentrate.
   * @param updateConcentrateDto - The data transfer object containing the updated concentrate details.
   * @returns The updated concentrate.
   */
  async update(
    id: string,
    updateConcentrateDto: UpdateConcentrateDto,
  ): Promise<Concentrate> {
    const concentrate = await this.concentrateModel.findByIdAndUpdate(
      id,
      updateConcentrateDto,
      { new: true },
    );

    if (!concentrate) {
      throw new NotFoundException(`Concentrate with ID ${id} not found`);
    }

    // Автоматический пересчет состава после обновления, если есть удобрения
    if (concentrate.fertilizers && concentrate.fertilizers.length > 0) {
      await this.calculateConcentrateContent(concentrate);
    }

    return concentrate;
  }

  /**
   * Removes a concentrate
   * @param id - The ID of the concentrate.
   * @returns The removed concentrate.
   */
  remove(id: string): Promise<Concentrate> {
    return this.concentrateModel.findByIdAndDelete(id);
  }

  /**
   * Рассчитывает содержание элементов в концентрате на основе удобрений
   * @param concentrate Концентрат для расчета
   * @returns Обновленный объект концентрата
   */
  async calculateConcentrateContent(concentrate: ConcentrateDocument) {
    try {
      const fertilizers = await Promise.all(
        concentrate.fertilizers.map(async (f) => {
          const fertilizer = await this.fertilizerModel.findById(f.fertilizer);
          if (!fertilizer) {
            throw new NotFoundException(
              `Fertilizer with ID ${f.fertilizer} not found`,
            );
          }
          return {
            ...fertilizer.toObject(),
            concentration: f.concentration,
            solution: fertilizer.solution,
          };
        }),
      );

      // Создаем экземпляр solution
      const solutionInstance = new solution();
      const ions: IonConductivity[] = [];

      // Обходим все удобрения и собираем элементы и ионы
      fertilizers.forEach((f) => {
        const dilutionFactor = f.concentration / 100;

        // Добавляем элементы
        f.solution.elements.forEach((e) => {
          const dilutedConcentration = e.concentration * dilutionFactor;

          // Для отладки калия
          if (e.element === 'K') {
            this.logger.debug(
              `Калий в концентрате: ${e.concentration} мг/л * ${dilutionFactor} = ${dilutedConcentration} мг/л`,
            );
          }

          solutionInstance.addElement(e.element, dilutedConcentration);
        });

        // Суммируем катионы и анионы с учетом разведения
        solutionInstance.kationes += f.solution.kationes * dilutionFactor;
        solutionInstance.aniones += f.solution.aniones * dilutionFactor;

        // Примерно оцениваем EC - пропорционально разведению
        // Точный расчет требует информацию о каждом ионе, которая недоступна здесь
        if (f.solution.EC) {
          solutionInstance.EC += f.solution.EC * dilutionFactor;
        }
      });

      // Проверяем баланс ионов
      const ionBalance = solutionInstance.checkIonBalance();
      if (ionBalance > 5) {
        this.logger.warn(
          `Дисбаланс ионов в концентрате: ${ionBalance.toFixed(2)}%`,
        );
      }

      // Обновляем свойства концентрата
      concentrate.content = solutionInstance.elements;
      concentrate.kationes = solutionInstance.kationes;
      concentrate.aniones = solutionInstance.aniones;
      concentrate.solution = solutionInstance;

      return concentrate.save();
    } catch (error) {
      this.logger.error(`Error calculating concentrate: ${error.message}`);
      throw new NotFoundException(
        `Failed to calculate concentrate: ${error.message}`,
      );
    }
  }
}
