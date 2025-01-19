import { ConfigService } from '@nestjs/config';
export declare class GoogleAuthService {
    private configService;
    private oauth2Client;
    constructor(configService: ConfigService);
    setCredentials(tokens: {
        access_token: string;
        refresh_token?: string;
        expiry_date?: number;
    }): void;
    refreshAccessToken(): Promise<any>;
    getAuth(): any;
}
