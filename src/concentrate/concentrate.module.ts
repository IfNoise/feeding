import { Logger, Module } from '@nestjs/common';
import { ConcentrateService } from './concentrate.service';
import { ConcentrateController } from './concentrate.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { FertilizerController } from './fertilizer.controller';
import { FertilizerService } from './fertilizer.service';

@Module({
  imports: [SchemasModule],
  controllers: [ConcentrateController, FertilizerController],
  providers: [ConcentrateService, FertilizerService, Logger],
  exports: [ConcentrateService, FertilizerService, Logger],
})
export class ConcentrateModule {}
