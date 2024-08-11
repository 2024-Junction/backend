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
let FoodService = class FoodService {
    constructor() {
    }
    async findFood(query) {
        const filePath = path.join(__dirname, `../../src/data/food_data.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const result = [];
        data['records'].forEach(element => {
            const subdata = [];
            console.log(element);
            if (element['에너지(kcal)'] > 0)
                subdata.push({ name: '에너지(kcal)', value: element['에너지(kcal)'] });
        });
        return result;
    }
};
exports.FoodService = FoodService;
exports.FoodService = FoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FoodService);
//# sourceMappingURL=food.service.js.map