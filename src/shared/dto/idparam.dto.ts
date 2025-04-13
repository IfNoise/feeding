import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class IdParamDto {
  @ApiProperty({
    description: 'MongoDB ID объекта',
    example: '60f790f3b311f83d1f4f3f3d',
  })
  @IsString()
  @IsMongoId()
  id: string;
}
