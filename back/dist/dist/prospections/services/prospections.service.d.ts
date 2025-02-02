import { StorageService } from "../../storage/services/storage.service";
import { ProspectionDto } from "../dto/prospection.dto";
import { SpreadSheetsProspectionsService } from "../spreadsheets/services/spreadsheets.prospections.service";
import { ProspectionsDbService } from "./prospections.db.service";
export declare class ProspectionsService {
    private ProspectionsDbService;
    private storageService;
    private spreadsheetsService;
    constructor(ProspectionsDbService: ProspectionsDbService, storageService: StorageService, spreadsheetsService: SpreadSheetsProspectionsService);
    createNewProspection(prospection: ProspectionDto, accessToken: any, refreshToken: any, clientId: any, clientSecret: any): Promise<import("../entities/prospection.entity").Prospection_Entity>;
    findAll(user_id: string): Promise<import("../dto/prospection.db").ProspectionDb[]>;
    findOne(id: string): Promise<import("../entities/prospection.entity").Prospection_Entity>;
    update(id: string, updateProspectionDto: Partial<ProspectionDto>, accessToken: any, refreshToken: any, clientId: any, clientSecret: any): Promise<import("rxjs").Observable<import("typeorm").UpdateResult>>;
    updateMany(user_id: string, updateProspectionDto: any): Promise<import("typeorm").UpdateResult>;
    remove(user_id: string, id: string, accessToken: any, refreshToken: any, clientId: any, clientSecret: any): Promise<import("../entities/prospection.entity").Prospection_Entity>;
}
