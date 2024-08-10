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
exports.NaverStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const passport_naver_1 = require("passport-naver");
let NaverStrategy = class NaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_1.Strategy, 'naver') {
    constructor(config, jwtService) {
        const NAVER_CLIENT_ID = config.get('NAVER_CLIENT_ID');
        const NAVER_CLIENT_SECRET = config.get('NAVER_CLIENT_SECRET');
        const CALLBACK_URL = config.get('NAVER_CALLBACK_URL');
        super({
            clientID: NAVER_CLIENT_ID,
            clientSecret: NAVER_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
        });
        this.config = config;
        this.jwtService = jwtService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const { _json } = profile;
            const user = {
                email: _json.email,
                nickname: _json.nickname,
                photo: _json.profile_image,
            };
            const payload = { email: user.email, sub: user.email };
            const jwt = this.jwtService.sign(payload);
            done(null, { user, jwt });
        }
        catch (error) {
            done(error);
        }
    }
};
exports.NaverStrategy = NaverStrategy;
exports.NaverStrategy = NaverStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], NaverStrategy);
//# sourceMappingURL=naver-oauth.strategy.js.map