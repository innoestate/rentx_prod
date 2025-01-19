import { Timestamp } from 'typeorm';
export declare class User {
    id: string;
    email: string;
    refresh_token: string;
    created_at: Timestamp;
    updated_at: Timestamp;
}
