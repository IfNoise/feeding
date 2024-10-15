import { PartialType } from '@nestjs/mapped-types';
import { CreateConcentrateDto } from './create-concentrate.dto';

/**
 * Data transfer object for updating a concentrate.
 */
export class UpdateConcentrateDto extends PartialType(CreateConcentrateDto) {}
