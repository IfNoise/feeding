import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateElementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
