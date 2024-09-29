import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFertilizerUnitDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;
}
