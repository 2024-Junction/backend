import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

@Injectable()
export class GeminiService {
    private gemini: GoogleGenerativeAI;
    private model: GenerativeModel

    constructor(
        readonly configService: ConfigService,
    ) {
        this.gemini = new GoogleGenerativeAI(configService.get('AIzaSyB1k4s9J_gIt6tXjdHWGMIxyhsyF9nq6bE'));
        this.model = this.gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
    }


    async analyze(foodSentence: string): Promise<any> {
        let result = {}

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
}