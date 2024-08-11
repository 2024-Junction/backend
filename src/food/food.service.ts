import { Injectable, Param } from '@nestjs/common';
import * as fs from "fs";
import * as path from 'path'
import * as deepl from "deepl-node"

@Injectable()
export class FoodService {
    constructor() {
    }

    async findFood(query: string) {
        // const translateText = await translate(query, { from: 'en', to: 'ko' })
        const translater = new deepl.Translator("bc618758-73cb-4141-9a7e-8732823d94a6:fx")
        const translateText = await translater.translateText(query, 'en', 'ko')
        const filePath = path.join(__dirname, `../../src/data/food_data.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        const result = [];
        data['records'].forEach(element => {
            if (translateText.text.includes(element['대표식품명'])) {
                const subdata = []
                subdata.push({ name: '에너지(kcal)', value: element['에너지(kcal)'] });
                subdata.push({ name: '지방(g)', value: element['지방(g)'] });
                subdata.push({ name: '탄수화물(g)', value: element['탄수화물(g)'] });


                subdata.push({ name: '당류(g)', value: element['당류(g)'] });
                subdata.push({ name: '칼륨(mg)', value: element['칼륨(mg)'] });

                result.push(subdata);
            }
        });
        return result.slice(1, 21);
    }
}

