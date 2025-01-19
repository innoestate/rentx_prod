import { ProspectionsDbService } from "./prospections.db.service";
import { ProspectionDto } from "../dto/prospection.dto";
import { StorageService } from "../../storage/services/storage.service";
export declare class ProspectionsService {
    private ProspectionsDbService;
    private storageService;
    constructor(ProspectionsDbService: ProspectionsDbService, storageService: StorageService);
    createNewProspection(prospection: ProspectionDto, accessToken: any, refreshToken: any, clientId: any, clientSecret: any): Promise<import("../entities/prospection.entity").Prospection_Entity>;
    findAll(user_id: string): Promise<import("../dto/prospection.db").ProspectionDb[]>;
    findOne(id: string): Promise<import("../entities/prospection.entity").Prospection_Entity>;
    update(id: string, updateProspectionDto: Partial<ProspectionDto>): Promise<import("typeorm").UpdateResult>;
    updateMany(user_id: string, updateProspectionDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("../entities/prospection.entity").Prospection_Entity>;
}
