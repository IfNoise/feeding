import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculationService } from './services/calculation.service';
import { ConcentrateSchema } from '../schemas/concentrate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Concentrate', schema: ConcentrateSchema },
    ]),
  ],
  providers: [CalculationService],
  exports: [CalculationService],
})
export class SharedModule {}
