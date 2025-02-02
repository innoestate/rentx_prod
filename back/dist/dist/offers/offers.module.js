"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const owners_module_1 = require("../owners/owners.module");
const storage_service_1 = require("../storage/services/storage.service");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const offers_controler_1 = require("./offers.controler");
const offers_db_service_1 = require("./services/offers.db.service");
const offers_service_1 = require("./services/offers.service");
const offer_entity_1 = require("./models/offer.entity");
const prospection_entity_1 = require("../prospections/entities/prospection.entity");
const prospections_db_service_1 = require("../prospections/services/prospections.db.service");
const owners_entity_1 = require("../owners/owners.entity");
let OffersModule = class OffersModule {
};
exports.OffersModule = OffersModule;
exports.OffersModule = OffersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            owners_module_1.OwnersModule,
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                offer_entity_1.Offer_Entity,
                prospection_entity_1.Prospection_Entity,
                owners_entity_1.Owner_Entity
            ])
        ],
        controllers: [offers_controler_1.OffersController],
        providers: [storage_service_1.StorageService, offers_service_1.OffersService, offers_db_service_1.OffersDbService, prospections_db_service_1.ProspectionsDbService, user_service_1.UsersService],
        exports: [storage_service_1.StorageService, offers_service_1.OffersService, offers_db_service_1.OffersDbService, prospections_db_service_1.ProspectionsDbService]
    })
], OffersModule);
//# sourceMappingURL=offers.module.js.map