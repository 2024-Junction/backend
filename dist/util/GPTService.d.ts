import { ConfigService } from "@nestjs/config";
export declare class GPTService {
    readonly configService: ConfigService;
    private openai;
    constructor(configService: ConfigService);
    analyzeAndRecommend(foodSentence: string): Promise<string>;
}
