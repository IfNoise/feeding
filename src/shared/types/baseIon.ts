import { ApiProperty } from '@nestjs/swagger';

export class baseIon {
  /** Символ иона (например, 'K+', 'NO3-') */
  @ApiProperty({
    description: 'Символ иона (например, K+, NO3-)',
    example: 'NO3-',
  })
  symbol: string;

  /** Заряд иона (положительное или отрицательное число) */
  @ApiProperty({
    description: 'Заряд иона (положительное или отрицательное число)',
    example: -1,
  })
  charge: number;

  /** Молярная масса иона, г/моль */
  @ApiProperty({
    description: 'Молярная масса иона, г/моль',
    example: 62,
  })
  mMass: number;

  /** Удельная электропроводность иона, См⋅см²/моль */
  @ApiProperty({
    description: 'Удельная электропроводность иона, См⋅см²/моль',
    example: 71.4,
  })
  сonductivityCoefficient: number;

  /** Количество атомов элемента в соединении (например, 2 для K в K2O) */
  @ApiProperty({
    description:
      'Количество атомов элемента в соединении (например, 2 для K в K2O)',
    example: 1,
    default: 1,
  })
  atomCount: number = 1;
}
