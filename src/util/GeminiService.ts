import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GeminiService {
    private gemini: GoogleGenerativeAI;
    private model: GenerativeModel

    constructor(
        readonly configService: ConfigService,
    ) {
        this.gemini = new GoogleGenerativeAI(configService.get('GEMINI_API_KEY'));
        this.model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    }


    async analyzeAndRecommend(foodSentence: string): Promise<string> {
        const prompt = `The user said they want to eat the following food: "${foodSentence}". 
    Please analyze the reason for this craving and suggest an alternative food that is suitable for pregnant women. Make the data format a JSON file.  The JSON file must contain only the values ​​of analysis, reason, suggestion_food, and suggestion_reason.`;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
}