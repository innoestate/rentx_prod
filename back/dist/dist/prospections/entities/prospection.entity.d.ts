import { Offer_Entity } from '../../offers/models/offer.entity';
export declare class Prospection_Entity {
    id: string;
    seller_id: string;
    user_id: string;
    zip: string;
    city: string;
    status: string;
    address: string;
    link: string;
    price: number;
    counter_proposal: number;
    emission_date: Date;
    offer_id: string;
    construction_cost: number;
    rents: any;
    resume: string;
    comment: string;
    storage_folder_id: string;
    offers: Offer_Entity[];
}
