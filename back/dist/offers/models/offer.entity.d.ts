import { Prospection_Entity } from '../../prospections/entities/prospection.entity';
export declare class Offer_Entity {
    id: string;
    user_id: string;
    price: number;
    prospection_id: string;
    google_drive_id: string;
    prospection: Prospection_Entity;
}
