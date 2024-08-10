import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Profile, Strategy } from "passport-kakao";
declare const KakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class KakaoStrategy extends KakaoStrategy_base {
    readonly config: ConfigService;
    private readonly jwtService;
    constructor(config: ConfigService, jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void): Promise<void>;
}
export {};
