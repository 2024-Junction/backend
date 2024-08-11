import { FoodService } from './food.service';
import { GeminiService } from 'src/util/GeminiService';
export declare class FoodController {
    private readonly foodService;
    private readonly geminiService;
    constructor(foodService: FoodService, geminiService: GeminiService);
    searchFood(req: any, query: string): Promise<void>;
    getAlternativeFood(req: any, query: string): Promise<{
        text: any;
        nutrient: Promise<void>;
    }>;
}
