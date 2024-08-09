import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-naver";

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(readonly config: ConfigService, private readonly jwtService: JwtService) {
        const NAVER_CLIENT_ID = config.get('NAVER_CLIENT_ID');
        const NAVER_CLIENT_SECRET = config.get('NAVER_CLIENT_SECRET');
        const CALLBACK_URL = config.get('NAVER_CALLBACK_URL');

        super({
            clientID: NAVER_CLIENT_ID,
            clientSecret: NAVER_CLIENT_SECRET,
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
                email: _json.email,
                nickname: _json.nickname,
                photo: _json.profile_image,
            };

            const payload = { email: user.email, sub: user.email };
            const jwt = this.jwtService.sign(payload);

            done(null, { user, jwt });
        } catch (error) {
            done(error);
        }
    }
}