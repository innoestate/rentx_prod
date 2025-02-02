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
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prospections_db_service_1 = require("../../prospections/services/prospections.db.service");
const folder_storage_google_drive_strategy_1 = require("../../storage/strategy/folder-storage.google_drive.strategy");
const folder_storage_mock_strategy_1 = require("../../storage/strategy/folder-storage.mock.strategy");
const storage_utils_1 = require("../../storage/utils/storage.utils");
const offers_db_service_1 = require("./offers.db.service");
let OffersService = class OffersService {
    constructor(OffersServiceDb, prospectionsDbService, configService) {
        this.OffersServiceDb = OffersServiceDb;
        this.prospectionsDbService = prospectionsDbService;
        this.configService = configService;
    }
    async addOffer(user_id, prospection_id, offer, file, accessToken, refreshToken, clientId, clientSecret) {
        const prospection = await this.prospectionsDbService.findOne(prospection_id);
        let storageStrategy;
        if (this.configService.get('NODE_ENV') === 'test') {
            storageStrategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        }
        else {
            storageStrategy = new folder_storage_google_drive_strategy_1.FolderStorageGoogleDriveStrategy();
            await storageStrategy.init(accessToken, refreshToken, clientId, clientSecret);
        }
        const google_drive_id = await storageStrategy.addFile(prospection.storage_folder_id, file, 'offre_' + (0, storage_utils_1.getProspectionFolderPath)(prospection) + '.pdf');
        return await this.OffersServiceDb.create({ ...offer, user_id, google_drive_id });
    }
};
exports.OffersService = OffersService;
exports.OffersService = OffersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [offers_db_service_1.OffersDbService,
        prospections_db_service_1.ProspectionsDbService,
        config_1.ConfigService])
], OffersService);
//# sourceMappingURL=offers.service.js.map