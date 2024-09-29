import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePumpDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  minFlowRate?: number;

  @IsNumber()
  @IsOptional()
  maxFlowRate?: number;

  @IsString()
  @IsOptional()
  concentrate?: string;

  @IsNumber()
  @IsOptional()
  flowRate?: number;

  @IsNumber()
  @IsOptional()
  factor?: number;
}
