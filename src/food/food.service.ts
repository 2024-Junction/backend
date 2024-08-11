import { Injectable, Param } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path'

@Injectable()
export class FoodService {
    constructor() {
    }

    async findFood(query: string) {
        const filePath = path.join(__dirname, `../../src/data/food_data.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const result = [];
        data['records'].forEach(element => {
            const subdata = []
            if (element['에너지(kcal)'] > 0) subdata.push({ name: '에너지(kcal)', value: element['에너지(kcal)'] });
            if (element['지방(g)'] > 0) subdata.push({ name: '지방(g)', value: element['지방(g)'] });
            if (element['탄수화물(g)'] > 0) subdata.push({ name: '탄수화물(g)', value: element['탄수화물(g)'] });

            if (subdata.length < 3 && element['당류(g)'] > 0)
                subdata.push({ name: '당류(g)', value: element['당류(g)'] });

            if (subdata.length < 3 && element['칼륨(mg)'] > 0)
                subdata.push({ name: '칼륨(mg)', value: element['칼륨(mg)'] });
        });
        return result;
    }
}

