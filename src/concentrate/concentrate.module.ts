import { Module } from '@nestjs/common';
import { ConcentrateService } from './concentrate.service';
import { ConcentrateController } from './concentrate.controller';
import { SchemasModule } from 'src/schemas/schemas.module';

@Module({
  imports: [SchemasModule],
  controllers: [ConcentrateController],
  providers: [ConcentrateService],
  exports: [ConcentrateService],
})
export class ConcentrateModule {}
