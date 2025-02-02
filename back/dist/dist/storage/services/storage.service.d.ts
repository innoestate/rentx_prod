import { ProspectionsDbService } from "../../prospections/services/prospections.db.service";
import { ConfigService } from "@nestjs/config";
export declare class StorageService {
    private prospectionsDbService;
    private configService;
    folderStrategy: any;
    constructor(prospectionsDbService: ProspectionsDbService, configService: ConfigService);
    synchronize(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<boolean>;
}
