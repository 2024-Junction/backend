import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(readonly config: ConfigService, private readonly jwtService: JwtService) {
        const KAKAO_CLIENT_ID = config.get('KAKAO_CLIENT_ID');
        const KAKAO_CLIENT_SECRET = config.get('KAKAO_CLIENT_SECRET');
        const CALLBACK_URL = config.get('KAKAO_CALLBACK_URL');

        super({
            clientID: KAKAO_CLIENT_ID,
            clientSecret: KAKAO_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any, info?: any) => void,
    ) {
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
        } catch (error) {
            done(error);
        }
    }
}