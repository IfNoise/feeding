import { Module } from '@nestjs/common';
import { SchemasModule } from 'src/schemas/schemas.module';
import { CalculationHelperService } from './services/calculation-helper.service';

@Module({
  imports: [SchemasModule],
  providers: [CalculationHelperService],
  exports: [CalculationHelperService],
})
export class SharedModule {}
