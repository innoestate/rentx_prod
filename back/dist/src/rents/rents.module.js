"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const lodger_entity_1 = require("../lodgers/lodger.entity");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const rents_controller_1 = require("./rents.controller");
const owners_service_1 = require("../owners/owners.service");
const estate_entity_1 = require("../estates/estate.entity");
const owners_entity_1 = require("../owners/owners.entity");
const lodgers_service_1 = require("../lodgers/lodgers.service");
const estates_service_1 = require("../estates/estates.service");
let RentsModule = class RentsModule {
};
exports.RentsModule = RentsModule;
exports.RentsModule = RentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, estate_entity_1.Estate, owners_entity_1.Owner_Entity, lodger_entity_1.Lodger_Entity]),
        ],
        controllers: [rents_controller_1.RentsController],
        providers: [user_service_1.UsersService, estates_service_1.EstatesService, owners_service_1.OwnersService, lodgers_service_1.LodgersService],
        exports: [user_service_1.UsersService, estates_service_1.EstatesService, owners_service_1.OwnersService, lodgers_service_1.LodgersService]
    })
], RentsModule);
//# sourceMappingURL=rents.module.js.map