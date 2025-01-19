import { Timestamp } from 'typeorm';
export declare class Prospector_ai_offers_Entity {
    id: string;
    user_id: string;
    prospection_id: string;
    owner_id: string;
    seller_id: string;
    content: string;
    created_at: Timestamp;
}
