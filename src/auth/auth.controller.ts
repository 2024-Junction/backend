import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService) { }

    @Get('/google')
    @ApiOperation({ summary: 'get google oauth page url' })
    @ApiResponse({ status: 301 })
    @UseGuards(AuthGuard('google'))
    async googleAuthLogin(@Req() req) {
        // Guard redirects to Google login page
    }

    @Get("/google/redirect")
    @ApiOperation({ summary: 'get user data from google' })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        await this.userService.create({ ...req.user.user, loginType: 'google' });
        return {
            message: 'User information from Google',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }

    @Get('/kakao')
    @ApiOperation({ summary: 'get kakao oauth page url' })
    @ApiResponse({ status: 301 })
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuthLogin(@Req() req) {
        // Guard redirects to Kakao login page
    }

    @Get('/kakao/redirect')
    @ApiOperation({ summary: 'get user data from kakao' })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard('kakao'))
    async kakaoAuthRedirect(@Req() req) {
        await this.userService.create({ ...req.user.user, loginType: 'kakao' });
        return {
            message: 'Kakao information from kakao',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }

    @Get('/naver')
    @ApiOperation({ summary: 'get kakao oauth page url' })
    @ApiResponse({ status: 301 })
    @UseGuards(AuthGuard('naver'))
    async naverAuth(@Req() _req: Request) {
        // Guard redirects to naver login page
    }

    /* Get naver Auth Callback */
    @Get('/naver/redirect')
    @ApiOperation({ summary: 'get user data from naver' })
    @ApiResponse({ status: 200 })
    @UseGuards(AuthGuard('naver'))
    async naverAuthCallback(
        @Req() req,
    ) {
        await this.userService.create({ ...req.user.user, loginType: 'naver' });
        return {
            message: 'User information from Naver',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }
}
