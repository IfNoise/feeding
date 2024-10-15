import { ApiProperty } from '@nestjs/swagger';

/**
 * Data transfer object for creating a concentrate.
 */
export class CreateConcentrateDto {
  /**
   * The name of the concentrate.
   * @type {string}
   */
  @ApiProperty({
    description: 'The name of the concentrate.',
    type: String,
    example: 'Calcium Nitrate',
  })
  name: string;

  /**
   * The description of the concentrate.
   * @type {string}
   * @example 'A concentrate containing calcium nitrate.'
   */
  @ApiProperty({
    description: 'The descriptio of ',
    type: String,
    example: 'A concentrate containing calcium nitrate.',
  })
  description: string;
}
