import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { ConfigModule } from '@nestjs/config';
import { GeminiService } from 'src/util/GeminiService';

@Module({
  imports: [ConfigModule],
  controllers: [FoodController],
  providers: [FoodService, GeminiService]
})
export class FoodModule { }
