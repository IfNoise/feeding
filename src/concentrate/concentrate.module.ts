import { Module } from '@nestjs/common';
import { ConcentrateService } from './concentrate.service';
import { ConcentrateController } from './concentrate.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SchemasModule, SharedModule],
  controllers: [ConcentrateController],
  providers: [ConcentrateService],
  exports: [ConcentrateService],
})
export class ConcentrateModule {}
