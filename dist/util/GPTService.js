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
exports.GPTService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let GPTService = class GPTService {
    constructor(configService) {
        this.configService = configService;
        const API_KEY = configService.get("OPENAI_API_KEY");
        const configuration = { apiKey: API_KEY };
        this.openai = new openai_1.default(configuration);
    }
    async analyzeAndRecommend(foodSentence) {
        const prompt = `The user said they want to eat the following food: "${foodSentence}". 
    Please analyze the reason for this craving and suggest an alternative food that is suitable for pregnant women.`;
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant knowledgeable about dietary recommendations for pregnant women.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ]
            });
            const recommendations = response.choices[0].message.content.trim();
            return recommendations;
        }
        catch (error) {
            console.error('Error communicating with OpenAI API:', error);
            throw new Error('Failed to analyze food recommendation.');
        }
    }
};
exports.GPTService = GPTService;
exports.GPTService = GPTService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GPTService);
//# sourceMappingURL=GPTService.js.map