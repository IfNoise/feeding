import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FertilizerModule } from './fertilizer/fertilizer.module';
import { ConcentrateModule } from './concentrate/concentrate.module';
import { FertilizerUnitModule } from './fertilizer-unit/fertilizer-unit.module';
//import { DevtoolsModule } from '@nestjs/devtools-integration';
import { RecipeModule } from './recipe/recipe.module';
import { WaterModule } from './water/water.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './common/logger.middlewware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // DevtoolsModule.register({
    //   http: process.env.NODE_ENV !== 'production',
    // }),
    FertilizerUnitModule,
    ConcentrateModule,
    FertilizerModule,
    RecipeModule,
    WaterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
