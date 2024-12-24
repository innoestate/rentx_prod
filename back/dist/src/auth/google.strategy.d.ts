import { ConfigService } from '@nestjs/config';
import { VerifyCallback } from 'passport-google-oauth20';
declare const GoogleStrategy_base: new (...args: any[]) => any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    constructor(configService: ConfigService);
    authorizationParams(): {
        access_type: string;
        prompt: string;
    };
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>;
}
export {};
