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
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const class_validator_1 = require("class-validator");
let FoodService = class FoodService {
    constructor(configService) {
        this.configService = configService;
        this.NOTION_SECRET = 'secret_rsJN8ijjSab8s9quCPySEtk6RiGm6WA2vZvJwu4tifw';
        this.NOTION_DATABASE = 'https://api.notion.com/v1/databases/bf6d73eb3189418ea87637e839b11fa0/query';
    }
    async findFood(query) {
        let results = [];
        const { data } = await axios_1.default.post(this.NOTION_DATABASE, {}, {
            headers: {
                'Authorization': `Bearer ${this.NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });
        results = data.results.filter(result => {
            if ((0, class_validator_1.isArray)(result.properties['이름'].title) && result.properties['이름'].title.length > 0) {
                return result.properties['이름'].title[0].text.content.includes(query);
            }
            else
                return result.properties['이름'].title.text.content.includes(query);
        });
        return results;
    }
};
exports.FoodService = FoodService;
exports.FoodService = FoodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FoodService);
//# sourceMappingURL=food.service.js.map