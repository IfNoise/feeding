import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePumpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  minFlowRate: number;

  @IsNumber()
  @IsNotEmpty()
  maxFlowRate: number;

  @IsString()
  @IsNotEmpty()
  concentrate: string;

  @IsNumber()
  @IsNotEmpty()
  flowRate: number;

  @IsNumber()
  @IsNotEmpty()
  factor: number;
}
