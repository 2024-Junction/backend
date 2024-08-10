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
exports.KakaoStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
let KakaoStrategy = class KakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'kakao') {
    constructor(config, jwtService) {
        const KAKAO_CLIENT_ID = config.get('KAKAO_CLIENT_ID');
        const KAKAO_CLIENT_SECRET = config.get('KAKAO_CLIENT_SECRET');
        const CALLBACK_URL = config.get('KAKAO_CALLBACK_URL');
        super({
            clientID: KAKAO_CLIENT_ID,
            clientSecret: KAKAO_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
        });
        this.config = config;
        this.jwtService = jwtService;
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const { _json } = profile;
            const user = {
                email: _json.kakao_account.email,
                nickname: _json.properties.nickname,
                photo: _json.properties.profile_image,
                accessToken
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
exports.KakaoStrategy = KakaoStrategy;
exports.KakaoStrategy = KakaoStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, jwt_1.JwtService])
], KakaoStrategy);
//# sourceMappingURL=kakao-oauth.strategy.js.map