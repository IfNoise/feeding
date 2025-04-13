import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConcentrateDocument } from '../../schemas/concentrate.schema';
import { FertilizerDocument } from '../../schemas/fertilizer.schema';

/**
 * Сервис для централизованного управления расчетами и перерасчетами
 * составов удобрений и концентратов
 */
@Injectable()
export class CalculationService {
  private readonly logger = new Logger(CalculationService.name);

  constructor(
    @InjectModel('Concentrate')
    private readonly concentrateModel: Model<ConcentrateDocument>,
  ) {}

  /**
   * Пересчитать все концентраты, связанные с указанным удобрением
   * @param fertilizerId ID удобрения, которое было изменено
   * @param concentrateService Сервис концентратов для расчета
   */
  async recalculateRelatedConcentrates(
    fertilizerId: string,
    concentrateService: any,
  ): Promise<void> {
    try {
      // Находим все концентраты, содержащие данное удобрение
      const relatedConcentrates = await this.concentrateModel
        .find({ 'fertilizers.fertilizer': fertilizerId })
        .exec();

      if (relatedConcentrates.length > 0) {
        this.logger.log(
          `Recalculating ${relatedConcentrates.length} concentrates related to fertilizer ${fertilizerId}`,
        );

        // Пересчитываем каждый найденный концентрат
        for (const concentrate of relatedConcentrates) {
          await concentrateService.calculateConcentrateContent(concentrate);
          this.logger.debug(`Recalculated concentrate ${concentrate._id}`);
        }
      }
    } catch (error) {
      this.logger.error(
        `Failed to recalculate related concentrates: ${error.message}`,
      );
    }
  }
}
