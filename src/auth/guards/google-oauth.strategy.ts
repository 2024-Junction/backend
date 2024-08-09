import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(readonly config: ConfigService, private readonly jwtService: JwtService) {
        const GOOGLE_CLIENT_ID = config.get('GOOGLE_CLIENT_ID');
        const GOOGLE_CLIENT_SECRET = config.get('GOOGLE_CLIENT_SECRET');
        const CALLBACK_URL = config.get('GOOGLE_CALLBACK_URL');

        super({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: ['profile', 'email'],
        });
    }


    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { id, name, emails, photos } = profile;

        const user = {
            provider: 'google',
            providerId: id,
            email: emails[0].value,
            name: `${name.givenName} ${name.familyName}`,
            picture: photos[0].value,
            accessToken
        };
        const payload = { email: user.email, sub: user.email };
        const jwt = this.jwtService.sign(payload);

        done(null, { user, jwt });
    }
}