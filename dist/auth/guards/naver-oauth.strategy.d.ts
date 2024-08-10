import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Profile, Strategy } from "passport-naver";
declare const NaverStrategy_base: new (...args: any[]) => Strategy;
export declare class NaverStrategy extends NaverStrategy_base {
    readonly config: ConfigService;
    private readonly jwtService;
    constructor(config: ConfigService, jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: (error: any, user?: any, info?: any) => void): Promise<void>;
}
export {};
