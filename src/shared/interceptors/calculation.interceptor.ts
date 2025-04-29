import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationHelperService } from '../services/calculation-helper.service';

@Injectable()
export class CalculationInterceptor implements NestInterceptor {
  private readonly logger = new Logger('CalculationInterceptor');

  constructor(private calculationHelper: CalculationHelperService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Если это массив - обрабатываем каждый элемент
        if (Array.isArray(data)) {
          return data.map((item) => this.processItem(item));
        }

        // Если это одиночный объект
        return this.processItem(data);
      }),
    );
  }

  private processItem(item: any): any {
    if (!item) return item;

    // Определяем тип объекта и вызываем соответствующий метод расчета
    if (item.elements && !item.fertilizers) {
      // Это удобрение (Fertilizer)
      return this.calculationHelper.calculateFertilizerFields(item);
    } else if (item.fertilizers) {
      // Это концентрат (Concentrate)
      return this.calculationHelper.calculateConcentrateFields(item);
    }

    return item;
  }
}
