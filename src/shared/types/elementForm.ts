import { baseIon } from './baseIon';

export interface elementForm {
  /** Название формы */
  name: string;

  /** Символ формы (химическая формула) */
  symbol: string;

  /** Информация об ионной форме */
  ione?: baseIon;

  /** Молекулярная масса формы, г/моль */
  mMass: number;
}
