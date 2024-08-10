import { ConfigService } from '@nestjs/config';
export declare class FoodService {
    private readonly configService;
    private NOTION_SECRET;
    private NOTION_DATABASE;
    constructor(configService: ConfigService);
    findFood(query: string): Promise<any[]>;
}
