import { Timestamp } from 'typeorm';
export declare class Prospector_ai_view_history_Entity {
    id: string;
    user_id: string;
    model: string;
    role: string;
    content: string;
    created_at: Timestamp;
}
