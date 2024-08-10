import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { isArray } from 'class-validator';

@Injectable()
export class FoodService {
    private NOTION_SECRET: string;
    private NOTION_DATABASE: string;

    constructor(private readonly configService: ConfigService) {
        this.NOTION_SECRET = this.configService.get('NOTION_SECRET');
        this.NOTION_DATABASE = this.configService.get('NOTION_DATABASE');
    }

    async findFood(query: string) {
        let results = [];

        const { data } = await axios.post(this.NOTION_DATABASE, {}, {
            headers: {
                'Authorization': `Bearer ${this.NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        })

        results = data.results.filter(result => {
            if (isArray(result.properties['이름'].title) && result.properties['이름'].title.length > 0) {
                return result.properties['이름'].title[0].text.content.includes(query);
            }
            else
                return result.properties['이름'].title.text.content.includes(query);
        })

        return results;
    }
}
