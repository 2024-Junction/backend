import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class FoodService {
    private NOTION_SECRET: string;
    private NOTION_DATABASE: string;

    constructor(private readonly configService: ConfigService) {
        this.NOTION_SECRET = this.configService.get('NOTION_SECRET');
        this.NOTION_DATABASE = this.configService.get('NOTION_DATABASE');
    }

    async findFood(query: string) {
        await axios.post(this.NOTION_DATABASE, {}, {
            headers: {
                'Authorization': `Bearer ${this.NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        })
    }
}
