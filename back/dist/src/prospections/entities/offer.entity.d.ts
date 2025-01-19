import { Prospection_Entity } from './prospection.entity';
export declare class Offer_Entity {
    id: string;
    price: number;
    prospection_id: string;
    prospection: Prospection_Entity;
}
