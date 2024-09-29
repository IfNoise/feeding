import { IsString, IsMongoId } from 'class-validator';

export class IdParamDto {
  @IsString()
  @IsMongoId()
  id: string;
}
