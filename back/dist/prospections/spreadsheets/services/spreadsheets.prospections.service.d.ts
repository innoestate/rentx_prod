import { ConfigService } from "@nestjs/config";
import { DocsDbService } from "../../../docs/docs.db.service";
import { ProspectionsDbService } from "../../services/prospections.db.service";
import { SellersDbService } from "../../services/sellers.db.service";
export declare class SpreadSheetsProspectionsService {
    private ProspectionsDbService;
    private sellersServicer;
    private docsServices;
    private configService;
    constructor(ProspectionsDbService: ProspectionsDbService, sellersServicer: SellersDbService, docsServices: DocsDbService, configService: ConfigService);
    private runOrNotSynchronizationWithDelay;
    synchronizeGoogleSheet(user_id: string, accessToken: any, refreshToken: any, clientId: any, clientSecret: any): Promise<void>;
}
