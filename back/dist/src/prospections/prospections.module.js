"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProspectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const owners_entity_1 = require("../owners/owners.entity");
const owners_module_1 = require("../owners/owners.module");
const storage_service_1 = require("../storage/services/storage.service");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const offer_entity_1 = require("../offers/models/offer.entity");
const prospection_entity_1 = require("./entities/prospection.entity");
const seller_entity_1 = require("./entities/seller.entity");
const prospections_controller_1 = require("./prospections.controller");
const prospections_db_service_1 = require("./services/prospections.db.service");
const prospections_service_1 = require("./services/prospections.service");
const sellers_db_service_1 = require("./services/sellers.db.service");
let ProspectionsModule = class ProspectionsModule {
};
exports.ProspectionsModule = ProspectionsModule;
exports.ProspectionsModule = ProspectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            owners_module_1.OwnersModule,
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                prospection_entity_1.Prospection_Entity,
                seller_entity_1.Seller_Entity,
                offer_entity_1.Offer_Entity,
                owners_entity_1.Owner_Entity
            ])
        ],
        controllers: [prospections_controller_1.ProspectionsController],
        providers: [storage_service_1.StorageService, prospections_service_1.ProspectionsService, prospections_db_service_1.ProspectionsDbService, sellers_db_service_1.SellersDbService, user_service_1.UsersService],
        exports: [storage_service_1.StorageService, prospections_service_1.ProspectionsService, prospections_db_service_1.ProspectionsDbService, user_service_1.UsersService]
    })
], ProspectionsModule);
//# sourceMappingURL=prospections.module.js.map