import { IsString, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';

export enum FertilizerType {
  SOLID = 'solid',
  LIQUID = 'liquid',
}

export class CreateFertilizerDto {
  @IsString()
  name: string;

  @IsEnum(FertilizerType)
  type: FertilizerType;

  @IsString()
  description: string;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  @IsOptional()
  price?: number;
}
