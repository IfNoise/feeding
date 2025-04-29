export interface ElementContent {
  element: string;
  concentration: number;
}
export interface CalculationResult {
  content: Array<{ element: string; concentration: number }>;
  aniones: number;
  kationes: number;
  solution: solution;
}

export interface SolutionProperties {
  EC?: number;
  pH?: number;
  density?: number;
  temperature?: number;
  [key: string]: any;
}

export class solution {
  elements: ElementContent[] = [];
  kationes: number = 0;
  aniones: number = 0;
  EC: number = 0;
  pH?: number;

  // Проверка баланса анионов и катионов
  checkIonBalance(): number {
    if (this.kationes === 0 || this.aniones === 0) return 0;

    return (
      (Math.abs(this.kationes - this.aniones) /
        ((this.kationes + this.aniones) / 2)) *
      100
    );
  }

  // Метод для добавления элемента
  addElement(element: string, concentration: number): void {
    const existingElement = this.elements.find((e) => e.element === element);

    if (existingElement) {
      existingElement.concentration += concentration;
    } else {
      this.elements.push({ element, concentration });
    }
  }
}
