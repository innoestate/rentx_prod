import { ConfigService } from "@nestjs/config";
import { OfferDto } from "../../offers/models/offer.dto";
import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { OffersDbService } from "./offers.db.service";
export declare class OffersService {
    private readonly OffersServiceDb;
    private readonly prospectionsDbService;
    private readonly configService;
    constructor(OffersServiceDb: OffersDbService, prospectionsDbService: ProspectionsDbService, configService: ConfigService);
    addOffer(user_id: string, prospection_id: string, offer: OfferDto, file: any, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<import("../models/offer.entity").Offer_Entity>;
}
