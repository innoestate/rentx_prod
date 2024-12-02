import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    googleLogin(req: any): Promise<"No user from google" | {
        message: string;
        user: any;
        token: string;
    }>;
}
