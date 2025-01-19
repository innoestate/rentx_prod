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
exports.ProspectionsService = void 0;
const common_1 = require("@nestjs/common");
const prospections_db_service_1 = require("./prospections.db.service");
const storage_service_1 = require("../../storage/services/storage.service");
let ProspectionsService = class ProspectionsService {
    constructor(ProspectionsDbService, storageService) {
        this.ProspectionsDbService = ProspectionsDbService;
        this.storageService = storageService;
    }
    async createNewProspection(prospection, accessToken, refreshToken, clientId, clientSecret) {
        console.log('create new prospection');
        const result = await this.ProspectionsDbService.create(prospection);
        try {
            await this.storageService.synchronize(prospection.user_id, accessToken, refreshToken, clientId, clientSecret);
        }
        catch (e) {
            console.error(e);
        }
        return result;
    }
    findAll(user_id) {
        return this.ProspectionsDbService.findAll(user_id);
    }
    findOne(id) {
        return this.ProspectionsDbService.findOne(id);
    }
    update(id, updateProspectionDto) {
        return this.ProspectionsDbService.update(id, updateProspectionDto);
    }
    updateMany(user_id, updateProspectionDto) {
        return this.ProspectionsDbService.updateMany(user_id, updateProspectionDto);
    }
    remove(id) {
        return this.ProspectionsDbService.remove(id);
    }
};
exports.ProspectionsService = ProspectionsService;
exports.ProspectionsService = ProspectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prospections_db_service_1.ProspectionsDbService, storage_service_1.StorageService])
], ProspectionsService);
//# sourceMappingURL=prospections.service.js.map