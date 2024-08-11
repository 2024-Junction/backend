import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { FoodService } from './food.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GeminiService } from 'src/util/GeminiService';

@Controller('food')
@ApiTags('Food')
export class FoodController {

    constructor(private readonly foodService: FoodService, private readonly geminiService: GeminiService) { }

    @Get("search/:query")
    @ApiOperation({ summary: 'get food database' })
    @ApiResponse({ status: 200 })
    async searchFood(@Req() req, @Param('query') query: string) {
        return await this.foodService.findFood(query);
    }

    @Post("needs")
    @ApiOperation({ summary: 'get alternative food data' })
    @ApiResponse({ status: 201 })
    async getAlternativeFood(@Req() req, @Body('query') query: string) {
        const text = await this.geminiService.analyze(query);
        const nutrient = await this.foodService.findFood(query);

        return { text, nutrient };
    }
}
