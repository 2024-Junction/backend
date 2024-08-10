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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const common_1 = require("@nestjs/common");
const food_service_1 = require("./food.service");
const swagger_1 = require("@nestjs/swagger");
const GeminiService_1 = require("../util/GeminiService");
let FoodController = class FoodController {
    constructor(foodService, geminiService) {
        this.foodService = foodService;
        this.geminiService = geminiService;
    }
    async searchFood(req, query) {
        return this.foodService.findFood(query);
    }
    async getAlternativeFood(req, query) {
        return this.geminiService.analyze(query);
    }
};
exports.FoodController = FoodController;
__decorate([
    (0, common_1.Get)("search/:query"),
    (0, swagger_1.ApiOperation)({ summary: 'get food database' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "searchFood", null);
__decorate([
    (0, common_1.Post)("needs"),
    (0, swagger_1.ApiOperation)({ summary: 'get alternative food data' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FoodController.prototype, "getAlternativeFood", null);
exports.FoodController = FoodController = __decorate([
    (0, common_1.Controller)('food'),
    (0, swagger_1.ApiTags)('Food'),
    __metadata("design:paramtypes", [food_service_1.FoodService, GeminiService_1.GeminiService])
], FoodController);
//# sourceMappingURL=food.controller.js.map