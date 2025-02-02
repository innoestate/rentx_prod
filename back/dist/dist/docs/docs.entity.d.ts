import { Timestamp } from 'typeorm';
export declare class Docs_Entity {
    id: string;
    user_id: string;
    rents_google_sheet_id: string;
    prospections_google_sheet_id: string;
    lastSynchronization: Timestamp;
}
