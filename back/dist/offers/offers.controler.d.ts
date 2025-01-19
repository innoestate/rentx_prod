import { ConfigService } from '@nestjs/config';
import { ProspectionsDbService } from '../prospections/services/prospections.db.service';
import { OffersDbService } from './services/offers.db.service';
import { OffersService } from './services/offers.service';
export declare class OffersController {
    private readonly offersService;
    private readonly offersServiceDb;
    private prospectionsDbService;
    private configService;
    constructor(offersService: OffersService, offersServiceDb: OffersDbService, prospectionsDbService: ProspectionsDbService, configService: ConfigService);
    createOffer(body: any, req: any): Promise<import("./models/offer.entity").Offer_Entity>;
    findAllOffers(req: any): Promise<import("./models/offer.entity").Offer_Entity[]>;
}
