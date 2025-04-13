import { Logger } from '@nestjs/common';
import { baseElement } from '../types/baseElement';
import { elementForm } from '../types/elementForm';
import { baseIon } from '../types/baseIon';

const logger = new Logger('ElementCalculations');

/**
 * Информация о результате расчета элемента в растворе
 * @public
 */
export interface ElementCalculationResult {
  /** Символ элемента */
  element: string;

  /** Концентрация элемента в мг/л */
  concentration: number;

  /** Молярная концентрация в моль/л */
  molarConcentration?: number;

  /** Эквивалентная концентрация с учетом заряда в моль экв/л */
  equivalentConcentration?: number;
}

/**
 * Информация об ионе для расчета электропроводности
 * @public
 */
export interface IonConductivity {
  /** Молярная концентрация в моль/л */
  concentration: number;

  /** Коэффициент удельной электропроводности См⋅см²/моль */
  conductivityCoefficient: number;
}

/**
 * Рассчитывает коэффициент чистоты элемента в соединении
 * с учетом количества атомов элемента
 *
 * @param element Базовый элемент
 * @param form Форма элемента (соединение)
 * @returns Коэффициент чистоты
 */
export function calculatePurityFactor(
  baseElement: baseElement,
  form: elementForm,
): number {
  // Стандартный расчет - соотношение молярных масс
  let purityFactor = baseElement.mMass / form.mMass;

  // Если у иона определено количество атомов, учитываем это
  if (form.ione?.atomCount && form.ione.atomCount > 1) {
    purityFactor = (form.ione.atomCount * baseElement.mMass) / form.mMass;
    logger.debug(
      `Применен множитель atomCount=${form.ione.atomCount} для ${form.symbol}, коэффициент: ${purityFactor.toFixed(4)}`,
    );
  }

  return purityFactor;
}

/**
 * Рассчитывает концентрацию элемента в растворе
 *
 * @param baseElement Базовый элемент
 * @param form Форма элемента
 * @param percentConcentration Процентное содержание в удобрении
 * @param dilutionFactor Фактор разведения г/л (обычно 1 г/л = 1000)
 * @returns Результат расчета элемента
 */
export function calculateElementConcentration(
  baseElement: baseElement,
  form: elementForm,
  percentConcentration: number,
  dilutionFactor: number = 1000,
): ElementCalculationResult {
  // Получаем коэффициент чистоты
  const purityFactor = calculatePurityFactor(baseElement, form);

  // Концентрация в мг/л = (% / 100) * коэффициент чистоты * фактор разведения
  const concentration =
    (percentConcentration / 100) * purityFactor * dilutionFactor;

  // Молярная концентрация (моль/л)
  const molarConcentration = concentration / 1000 / baseElement.mMass;

  // Эквивалентная концентрация с учетом заряда (моль экв/л)
  let equivalentConcentration = 0;
  if (form.ione && form.ione.charge) {
    equivalentConcentration = molarConcentration * Math.abs(form.ione.charge);
  }

  return {
    element: baseElement.symbol,
    concentration,
    molarConcentration,
    equivalentConcentration,
  };
}

/**
 * Рассчитывает электропроводность раствора
 * на основе коэффициентов проводимости ионов
 *
 * @param ions Массив ионов с их концентрациями и коэффициентами
 * @returns Электропроводность в мСм/см
 */
export function calculateElectricalConductivity(
  ions: IonConductivity[],
): number {
  if (ions.length === 0) {
    return 0;
  }

  const conductivity = ions.reduce((sum, ion) => {
    const contribution = ion.concentration * ion.conductivityCoefficient;
    return sum + contribution;
  }, 0);

  // Деление на 1000 для перевода в миллиСименсы на сантиметр
  return conductivity / 1000;
}
