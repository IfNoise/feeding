import { PartialType } from '@nestjs/mapped-types';
import { CreateFertilizerUnitDto } from './create-fertilizer-unit.dto';

export class UpdateFertilizerUnitDto extends PartialType(CreateFertilizerUnitDto) {}
