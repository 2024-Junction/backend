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
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const generative_ai_1 = require("@google/generative-ai");
let GeminiService = class GeminiService {
    constructor(configService) {
        this.configService = configService;
        this.gemini = new generative_ai_1.GoogleGenerativeAI('AIzaSyB1k4s9J_gIt6tXjdHWGMIxyhsyF9nq6bE');
        this.model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
    async analyze(foodSentence) {
        let result = {};
        const foodAnalysisResult = await this.model.generateContent(`The user said they want to eat the following food: "${foodSentence}". Determine whether the food is harmful to pregnant women in the order of ok, avoid, dangerous, and write it`);
        const response = await foodAnalysisResult.response;
        const text = await response.text();
        if (text !== 'ok') {
            let res = await this.model.generateContent(`${foodSentence} Explain in one line why foods are bad for pregnant women.`);
            let response = await res.response;
            let text = await response.text();
            res = await this.model.generateContent(`Please tell me one food that pregnant women can eat instead of ${foodSentence}`);
            response = await res.response;
            text = await response.text();
            result['explanation'] = text;
        }
        result['text'] = text;
        return result;
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GeminiService);
//# sourceMappingURL=GeminiService.js.map