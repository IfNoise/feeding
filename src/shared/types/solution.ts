export interface IElement {
  element: string;
  concentration: number;
}
export class solution {
  elements: IElement[];
  kationes: number; //сумма эквивалентов катионов
  aniones: number; //сумма эквивалентов анионов
  EC: number; //Прогнозируемая электропроводность раствора
}
