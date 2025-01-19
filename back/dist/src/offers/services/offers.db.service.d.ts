import { OfferDto } from "../../offers/models/offer.dto";
import { Offer_Entity } from "../../offers/models/offer.entity";
import { Repository } from "typeorm";
export declare class OffersDbService {
    private offerRepository;
    constructor(offerRepository: Repository<Offer_Entity>);
    create(createOfferDto: OfferDto): Promise<Offer_Entity>;
    findAllByUser(userId: string): Promise<Offer_Entity[]>;
}
