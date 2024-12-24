import { Observable } from 'rxjs';
export declare const sendEmail: (accessToken: string, refreshToken: string, email: string, clientId: string, clientSecret: string) => Observable<any>;
