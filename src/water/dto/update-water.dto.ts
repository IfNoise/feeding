import { PartialType } from '@nestjs/mapped-types';
import { CreateWaterDto } from './create-water.dto';

export class UpdateWaterDto extends PartialType(CreateWaterDto) {}
