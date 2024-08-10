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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("../users/users.service");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async googleAuthLogin(req) {
    }
    async googleAuthRedirect(req) {
        await this.userService.create({ ...req.user.user, loginType: 'google' });
        return {
            message: 'User information from Google',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }
    async kakaoAuthLogin(req) {
    }
    async kakaoAuthRedirect(req) {
        await this.userService.create({ ...req.user.user, loginType: 'kakao' });
        return {
            message: 'Kakao information from kakao',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }
    async naverAuth(_req) {
    }
    async naverAuthCallback(req) {
        await this.userService.create({ ...req.user.user, loginType: 'naver' });
        return {
            message: 'User information from Naver',
            user: req.user.user,
            jwt: req.user.jwt
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('/google'),
    (0, swagger_1.ApiOperation)({ summary: 'get google oauth page url' }),
    (0, swagger_1.ApiResponse)({ status: 301 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthLogin", null);
__decorate([
    (0, common_1.Get)("/google/redirect"),
    (0, swagger_1.ApiOperation)({ summary: 'get user data from google' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Get)('/kakao'),
    (0, swagger_1.ApiOperation)({ summary: 'get kakao oauth page url' }),
    (0, swagger_1.ApiResponse)({ status: 301 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoAuthLogin", null);
__decorate([
    (0, common_1.Get)('/kakao/redirect'),
    (0, swagger_1.ApiOperation)({ summary: 'get user data from kakao' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "kakaoAuthRedirect", null);
__decorate([
    (0, common_1.Get)('/naver'),
    (0, swagger_1.ApiOperation)({ summary: 'get kakao oauth page url' }),
    (0, swagger_1.ApiResponse)({ status: 301 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverAuth", null);
__decorate([
    (0, common_1.Get)('/naver/redirect'),
    (0, swagger_1.ApiOperation)({ summary: 'get user data from naver' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('naver')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "naverAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map