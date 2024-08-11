"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const deepl = require("deepl-node");
let FoodService = class FoodService {
    constructor() {
    }
    async findFood(query) {
        const translater = new deepl.Translator("bc618758-73cb-4141-9a7e-8732823d94a6:fx");
        const translateText = await translater.translateText(query, 'en', 'ko');
        const filePath = path.join(__dirname, `../../src/data/food_data.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const result = [];
        data['records'].forEach(element => {
            if (translateText.text.includes(element['대표식품명']) || element['대표식품명'].includes(translateText.text)) {
                const subdata = [];
                subdata.push({ name: '식품명', value: element['식품명'] });
                subdata.push({ name: '에너지(kcal)', value: element['에너지(kcal)'] });
                subdata.push({ name: '지방(g)', value: element['지방(g)'] });
                subdata.push({ name: '탄수화물(g)', value: element['탄수화물(g)'] });
                subdata.push({ name: '당류(g)', value: element['당류(g)'] });
                subdata.push({ name: '칼륨(mg)', value: element['칼륨(mg)'] });
                subdata.push({ name: '나트륨(mg)', value: element['나트륨(mg)'] });
                subdata.push({ name: '비타민 D(μg)', value: element['비타민 D(μg)'] });
                subdata.push({ name: '비타민 A(μg RAE)', value: element['비타민 D(μg)'] });
                result.push(subdata);
            }
        });
        return result.slice(10);
    }
};
exports.FoodService = FoodService;
exports.FoodService = FoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FoodService);
//# sourceMappingURL=food.service.js.map