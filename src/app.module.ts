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
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CacheModule.register({
      isGlobal: true, // Делаем кэш доступным глобально
      store: redisStore, // Используем Redis для кэша
      host: 'localhost',
      port: 6379,
      ttl: 3600, // 1 час по умолчанию
    }),
    SharedModule,
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
