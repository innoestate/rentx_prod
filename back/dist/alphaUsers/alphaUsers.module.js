"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaUsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alphaUsers_controller_1 = require("./alphaUsers.controller");
const alphaUsers_service_1 = require("./alphaUsers.service");
const alphaUser_entity_1 = require("./alphaUser.entity");
let AlphaUsersModule = class AlphaUsersModule {
};
exports.AlphaUsersModule = AlphaUsersModule;
exports.AlphaUsersModule = AlphaUsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([alphaUser_entity_1.AlphaUser])],
        controllers: [alphaUsers_controller_1.AlphaUsersController],
        providers: [alphaUsers_service_1.AlphaUsersService],
    })
], AlphaUsersModule);
//# sourceMappingURL=alphaUsers.module.js.map