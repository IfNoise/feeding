import { elementForm } from './elementForm';

export interface baseElement {
  /** Название элемента */
  name: string;

  /** Обозначение элемента */
  symbol: string;

  /** Молярная масса элемента, г/моль */
  mMass: number;

  /** Список форм, в которых элемент может присутствовать */
  forms: elementForm[];
}
