import { ConfigService } from '@nestjs/config';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { JwtService } from '@nestjs/jwt';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    readonly config: ConfigService;
    private readonly jwtService;
    constructor(config: ConfigService, jwtService: JwtService);
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
