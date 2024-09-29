import { PartialType } from '@nestjs/mapped-types';
import { CreateConcentrateDto } from './create-concentrate.dto';

export class UpdateConcentrateDto extends PartialType(CreateConcentrateDto) {}
