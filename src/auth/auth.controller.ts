import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
    constructor() { }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async googleAuthLogin(@Req() req) {
        // Guard redirects to Google login page
    }

    @Get("google/redirect")
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return {
            message: 'User information from Google',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }
}
