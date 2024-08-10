import { Controller, Param, Post, Req } from '@nestjs/common';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {

    constructor(private readonly foodService: FoodService) { }

    @Post("search/:query")
    async searchFood(@Req() req, @Param('query') query: string) {
        return this.foodService.findFood(query);
    }
}
