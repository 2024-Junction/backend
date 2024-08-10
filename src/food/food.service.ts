import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { isArray } from 'class-validator';

@Injectable()
export class FoodService {
    private NOTION_SECRET: string;
    private NOTION_DATABASE: string;

    constructor(private readonly configService: ConfigService) {
        this.NOTION_SECRET = 'secret_rsJN8ijjSab8s9quCPySEtk6RiGm6WA2vZvJwu4tifw'
        this.NOTION_DATABASE = 'https://api.notion.com/v1/databases/bf6d73eb3189418ea87637e839b11fa0/query'
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
