import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FertilizerDocument } from '../../schemas/fertilizer.schema';
import { ElementDocument } from '../../schemas/element.schema';
import { CalculationResult, solution } from '../types/solution';
import {
  calculateElementConcentration,
  calculateElectricalConductivity,
  IonConductivity,
} from '../utils/element-calculations';
import { baseElement } from '../types/baseElement';
import { elementForm } from '../types/elementForm';
import { ConcentrateDocument } from 'src/schemas/concentrate.schema';

@Injectable()
export class CalculationHelperService {
  private readonly logger = new Logger(CalculationHelperService.name);
  private elementBase: baseElement[] = [];

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('Element')
    private readonly elementModel: Model<ElementDocument>,
    // Если ConcentrateDocument используется, сохраните этот параметр:
    @InjectModel('Concentrate')
    private readonly concentrateModel: Model<ConcentrateDocument>,
    @InjectModel('Fertilizer')
    private readonly fertilizerModel: Model<FertilizerDocument>,
  ) {}

  private async loadElementBase() {
    try {
      this.elementBase = await import('../data/elementBase').then(
        (module) => module.elementBase,
      );
    } catch (error) {
      this.logger.error(`Failed to load element base: ${error.message}`);
      this.elementBase = [];
    }
  }

  /**
   * Рассчитывает поля для удобрения с использованием кэша
   */
  async calculateFertilizerFields(fertilizer: FertilizerDocument) {
    // Формируем уникальный ключ кэша на основе ID удобрения и хэша элементов
    const cacheKey = `fertilizer_calc_${fertilizer._id}_${this.getElementsHash(fertilizer.elements)}`;

    // Проверяем кэш
    let calculatedData: CalculationResult =
      await this.cacheManager.get(cacheKey);

    if (!calculatedData) {
      this.logger.debug(`Cache miss for ${cacheKey}, calculating...`);
      calculatedData = await this.performFertilizerCalculations(fertilizer);

      // Сохраняем в кэш на 1 час
      await this.cacheManager.set(cacheKey, calculatedData, 3600);
    }

    // Обновляем поля в объекте, не сохраняя в БД
    fertilizer.content = calculatedData.content;
    fertilizer.aniones = calculatedData.aniones;
    fertilizer.kationes = calculatedData.kationes;
    fertilizer.solution = calculatedData.solution;

    return fertilizer;
  }

  /**
   * Рассчитывает поля для концентрата с использованием кэша
   */
  async calculateConcentrateFields(concentrate: ConcentrateDocument) {
    // Формируем уникальный ключ кэша
    const fertilizerIds = concentrate.fertilizers
      .map((f) => `${f.fertilizer}_${f.concentration}`)
      .join('|');
    const cacheKey = `concentrate_calc_${concentrate._id}_${fertilizerIds}`;

    // Проверяем кэш
    let calculatedData: CalculationResult =
      await this.cacheManager.get(cacheKey);

    if (!calculatedData) {
      this.logger.debug(`Cache miss for ${cacheKey}, calculating...`);
      calculatedData = await this.performConcentrateCalculations(concentrate);

      // Сохраняем в кэш на 1 час
      await this.cacheManager.set(cacheKey, calculatedData, 3600);
    }

    // Обновляем поля в объекте, не сохраняя в БД
    concentrate.content = calculatedData.content;
    concentrate.aniones = calculatedData.aniones;
    concentrate.kationes = calculatedData.kationes;
    concentrate.solution = calculatedData.solution;

    return concentrate;
  }

  /**
   * Выполняет фактические вычисления для удобрения
   */
  private async performFertilizerCalculations(fertilizer: FertilizerDocument) {
    try {
      const elements = await this.elementModel.find({
        _id: { $in: fertilizer.elements },
      });

      let kationes = 0;
      let aniones = 0;
      const content = [];
      const ions: IonConductivity[] = [];

      elements.forEach((element) => {
        const baseElement = this.elementBase.find(
          (el: baseElement) => el.name === element.name,
        );
        const baseForm = baseElement?.forms.find(
          (el: elementForm) => el.symbol === element.form,
        );

        if (!baseElement || !baseForm) {
          this.logger.warn(
            `Base data not found for element ${element.name} form ${element.form}`,
          );
          return;
        }

        // Используем общую функцию для расчета концентрации
        const result = calculateElementConcentration(
          baseElement,
          baseForm,
          element.concentration,
        );

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
      solutionInstance.EC = calculateElectricalConductivity(ions);

      return {
        content,
        kationes,
        aniones,
        solution: solutionInstance,
      };
    } catch (error) {
      this.logger.error(`Error calculating fertilizer: ${error.message}`);
      return {
        content: [],
        kationes: 0,
        aniones: 0,
        solution: new solution(),
      };
    }
  }

  /**
   * Выполняет фактические вычисления для концентрата
   */
  /**
   * Performs calculations for a concentrate based on its constituent fertilizers
   * @param concentrate - The concentrate document to process
   * @returns Calculation result containing content, ions, solution properties
   */
  private async performConcentrateCalculations(
    concentrate: ConcentrateDocument,
  ): Promise<CalculationResult> {
    try {
      let kationes = 0;
      let aniones = 0;
      const elementMap = new Map<string, number>();
      const ions: IonConductivity[] = [];

      // Fetch all fertilizers at once to avoid multiple database calls
      const fertilizerIds = concentrate.fertilizers.map(
        (ref) => ref.fertilizer,
      );
      const fertilizers = await this.fertilizerModel.find({
        _id: { $in: fertilizerIds },
      });

      // Process each fertilizer in the concentrate
      for (const fertilizerRef of concentrate.fertilizers) {
        const fertilizer = fertilizers.find(
          (f) => f._id.toString() === fertilizerRef.fertilizer.toString(),
        );

        if (!fertilizer) {
          this.logger.warn(
            `Fertilizer ${fertilizerRef.fertilizer} not found for concentrate ${concentrate._id}`,
          );
          continue;
        }

        // Calculate fertilizer fields if not calculated yet
        if (!fertilizer.content || fertilizer.content.length === 0) {
          await this.calculateFertilizerFields(fertilizer);
        }

        // Get dilution factor based on concentrate ratio
        const dilutionFactor = fertilizerRef.concentration / 1000;

        // Process each element in this fertilizer
        if (fertilizer.content) {
          for (const elementContent of fertilizer.content) {
            // Apply dilution factor to concentration
            const dilutedConcentration =
              elementContent.concentration * dilutionFactor;

            // Add to the element map (accumulating concentrations for the same element)
            const currentConcentration =
              elementMap.get(elementContent.element) || 0;
            elementMap.set(
              elementContent.element,
              currentConcentration + dilutedConcentration,
            );
          }
        }

        // Add ion contributions to total
        if (fertilizer.aniones) {
          aniones += fertilizer.aniones * dilutionFactor;
        }

        if (fertilizer.kationes) {
          kationes += fertilizer.kationes * dilutionFactor;
        }

        // Collect ion conductivity data
        if (fertilizer.solution && fertilizer.solution.ions) {
          for (const ion of fertilizer.solution.ions) {
            ions.push({
              conductivityCoefficient: ion.coefficient,
              concentration: ion.concentration * dilutionFactor,
            });
          }
        }
      }

      // Convert element map to array format
      const content = Array.from(elementMap.entries()).map(
        ([element, concentration]) => ({
          element,
          concentration,
        }),
      );

      // Create solution object
      const solutionInstance = new solution();
      solutionInstance.elements = content;
      solutionInstance.kationes = kationes;
      solutionInstance.aniones = aniones;
      solutionInstance.EC = calculateElectricalConductivity(ions);

      return {
        content,
        aniones,
        kationes,
        solution: solutionInstance,
      };
    } catch (error) {
      this.logger.error(
        `Error calculating concentrate fields: ${error.message}`,
        error.stack,
      );
      throw new Error(
        `Failed to calculate concentrate fields: ${error.message}`,
      );
    }
  }

  /**
   * Генерирует хэш на основе массива элементов для кэширования
   */
  private getElementsHash(elements: any[]): string {
    if (!elements || elements.length === 0) return 'empty';

    return elements
      .map((e) => `${e._id || e.id}_${e.name}_${e.concentration}_${e.form}`)
      .join('|');
  }

  /**
   * Инвалидирует кэш для конкретного удобрения
   * @param fertilizerId - ID удобрения для инвалидации кеша
   */
  async invalidateFertilizerCache(fertilizerId: string): Promise<void> {
    // В новых версиях Cache Manager доступа к store.keys напрямую нет
    // Вместо этого используем del с ключом
    await this.cacheManager.del(`fertilizer_calc_${fertilizerId}`);

    // Также инвалидируем кэш концентратов, связанных с этим удобрением
    await this.invalidateRelatedConcentratesCache(fertilizerId);
  }

  /**
   * Инвалидирует кэш для концентратов, связанных с удобрением
   * @param fertilizerId - ID удобрения для инвалидации связанных концентратов
   */
  async invalidateRelatedConcentratesCache(
    fertilizerId: string,
  ): Promise<void> {
    try {
      // Находим все концентраты, которые используют это удобрение
      const relatedConcentrates = await this.concentrateModel.find({
        'fertilizers.fertilizer': fertilizerId,
      });

      // Инвалидируем кеш для каждого найденного концентрата
      for (const concentrate of relatedConcentrates) {
        await this.cacheManager.del(`concentrate_calc_${concentrate._id}`);
      }

      this.logger.debug(
        `Invalidated cache for ${relatedConcentrates.length} concentrates related to fertilizer ${fertilizerId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to invalidate related concentrates cache: ${error.message}`,
      );
    }
  }
}
