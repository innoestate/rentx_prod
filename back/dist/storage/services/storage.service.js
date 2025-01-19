"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const prospections_db_service_1 = require("../../prospections/services/prospections.db.service");
const storage_business_1 = require("../storage.business");
const folder_storage_google_drive_strategy_1 = require("../strategy/folder-storage.google_drive.strategy");
const config_1 = require("@nestjs/config");
const folder_storage_mock_strategy_1 = require("../strategy/folder-storage.mock.strategy");
let StorageService = class StorageService {
    constructor(prospectionsDbService, configService) {
        this.prospectionsDbService = prospectionsDbService;
        this.configService = configService;
    }
    async synchronize(userId, accessToken, refreshToken, clientId, clientSecret) {
        if (this.configService.get('NODE_ENV') === 'test') {
            this.folderStrategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        }
        else {
            this.folderStrategy = new folder_storage_google_drive_strategy_1.FolderStorageGoogleDriveStrategy();
            if (accessToken && refreshToken && clientId && clientSecret) {
                await this.folderStrategy.init(accessToken, refreshToken, clientId, clientSecret);
            }
        }
        const prospections = await this.prospectionsDbService.findAll(userId);
        const createdProspections = await (0, storage_business_1.synchronizeFoldersStorage)(prospections, this.folderStrategy);
        await Promise.all(Object.keys(createdProspections).map(async (prospectionId) => {
            await this.prospectionsDbService.update(prospectionId, { storage_folder_id: createdProspections[prospectionId] });
        }));
        return true;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prospections_db_service_1.ProspectionsDbService, config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map