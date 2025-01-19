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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProspectionsDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const offer_entity_1 = require("../../offers/models/offer.entity");
const prospection_entity_1 = require("../entities/prospection.entity");
let ProspectionsDbService = class ProspectionsDbService {
    constructor(prospectionRepository, offerRepository) {
        this.prospectionRepository = prospectionRepository;
        this.offerRepository = offerRepository;
    }
    async create(createProspectionDto) {
        const prospection = this.prospectionRepository.create(createProspectionDto);
        return this.prospectionRepository.save(prospection);
    }
    async findAll(user_id) {
        return this.prospectionRepository.find({
            where: { user_id },
            relations: ['offers']
        });
    }
    async findOne(id) {
        const prospection = await this.prospectionRepository.findOne({
            where: { id },
            relations: ['offers']
        });
        if (!prospection) {
            throw new common_1.NotFoundException(`Prospection with ID "${id}" not found`);
        }
        return prospection;
    }
    async update(id, updateProspectionDto) {
        return this.prospectionRepository.update(id, updateProspectionDto);
    }
    async updateMany(user_id, updateProspectionDto) {
        try {
            console.log('update many', user_id, updateProspectionDto);
            return this.prospectionRepository.update({ user_id }, updateProspectionDto);
        }
        catch (e) {
            console.error(e);
            throw new common_1.NotFoundException(`Fail to update many Prospections of ${user_id} for ${updateProspectionDto}`);
        }
    }
    async remove(id) {
        const prospection = await this.findOne(id);
        return this.prospectionRepository.remove(prospection);
    }
};
exports.ProspectionsDbService = ProspectionsDbService;
exports.ProspectionsDbService = ProspectionsDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(prospection_entity_1.Prospection_Entity)),
    __param(1, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer_Entity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProspectionsDbService);
//# sourceMappingURL=prospections.db.service.js.map