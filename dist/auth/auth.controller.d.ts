import { UsersService } from 'src/users/users.service';
export declare class AuthController {
    private readonly userService;
    constructor(userService: UsersService);
    googleAuthLogin(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        message: string;
        user: any;
        jwt: any;
    }>;
    kakaoAuthLogin(req: any): Promise<void>;
    kakaoAuthRedirect(req: any): Promise<{
        message: string;
        user: any;
        jwt: any;
    }>;
    naverAuth(_req: Request): Promise<void>;
    naverAuthCallback(req: any): Promise<{
        message: string;
        user: any;
        jwt: any;
    }>;
}
