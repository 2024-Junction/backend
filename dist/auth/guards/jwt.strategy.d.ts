import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-jwt";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly config: ConfigService;
    constructor(config: ConfigService);
    validate(payload: any): Promise<{
        userId: any;
        username: any;
    }>;
}
export {};
