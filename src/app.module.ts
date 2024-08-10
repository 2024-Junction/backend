import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validate } from './util/env.validation';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/env/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate
    }),
    FoodModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
