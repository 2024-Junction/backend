import { ConfigService } from "@nestjs/config";
export declare class GeminiService {
    readonly configService: ConfigService;
    private gemini;
    private model;
    private readonly stage;
    constructor(configService: ConfigService);
    analyze(foodSentence: string): Promise<any>;
}
