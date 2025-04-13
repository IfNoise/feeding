import { Logger, Module } from '@nestjs/common';
import { FertilizerService } from './fertilizer.service';
import { FertilizerController } from './fertilizer.controller';
import { SchemasModule } from 'src/schemas/schemas.module';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SchemasModule, SharedModule],
  controllers: [FertilizerController, ElementController],
  providers: [FertilizerService, ElementService, Logger],
  exports: [FertilizerService, ElementService, Logger],
})
export class FertilizerModule {}
