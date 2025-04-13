import { ApiProperty } from '@nestjs/swagger';
import {
  IonConductivity,
  calculateElectricalConductivity,
} from '../utils/element-calculations';

/**
 * Интерфейс для элемента в растворе
 * @property {string} element - Символ элемента, например 'N'
 * @property {number} concentration - Концентрация элемента в мг/л
 */
export interface IElement {
  element: string;
  concentration: number;
}

export class solution {
  @ApiProperty({
    description: 'Список элементов с их концентрациями',
    type: [Object],
    example: [
      { element: 'N', concentration: 150 },
      { element: 'K', concentration: 200 },
    ],
  })
  elements: IElement[] = [];

  @ApiProperty({
    description: 'Сумма эквивалентов катионов, моль экв/л',
    example: 0.015,
  })
  kationes: number = 0;

  @ApiProperty({
    description: 'Сумма эквивалентов анионов, моль экв/л',
    example: 0.015,
  })
  aniones: number = 0;

  @ApiProperty({
    description: 'Прогнозируемая электропроводность раствора, мСм/см',
    example: 1.2,
  })
  EC: number = 0;

  /**
   * Рассчитывает прогнозируемую электропроводность раствора
   * на основе коэффициентов проводимости ионов
   * @param ions массив ионов с их концентрациями и коэффициентами проводимости
   */
  calculateEC(ions: IonConductivity[]): void {
    this.EC = calculateElectricalConductivity(ions);
  }

  /**
   * Получает содержание конкретного элемента в растворе
   * @param symbol Символ элемента (например, 'K', 'N', 'P')
   * @returns Концентрация элемента в мг/л или 0, если элемент не найден
   */
  getElementConcentration(symbol: string): number {
    const element = this.elements.find((e) => e.element === symbol);
    return element ? element.concentration : 0;
  }

  /**
   * Добавляет элемент в раствор или обновляет его концентрацию,
   * если элемент с таким символом уже существует
   * @param symbol Символ элемента
   * @param concentration Концентрация элемента в мг/л
   */
  addElement(symbol: string, concentration: number): void {
    const element = this.elements.find((e) => e.element === symbol);
    if (element) {
      element.concentration += concentration;
    } else {
      this.elements.push({ element: symbol, concentration });
    }
  }

  /**
   * Проверяет баланс катионов и анионов
   * @returns Процент несоответствия либо 0 если баланс идеальный
   */
  checkIonBalance(): number {
    if (this.kationes === 0 || this.aniones === 0) {
      return 0;
    }

    return (
      (Math.abs(this.kationes - this.aniones) /
        ((this.kationes + this.aniones) / 2)) *
      100
    );
  }
}
