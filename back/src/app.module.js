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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const typeorm_service_1 = require("./services/typeorm.service");
const estates_module_1 = require("./estates/estates.module");
const user_module_1 = require("./user/user.module");
const owners_module_1 = require("./owners/owners.module");
const lodgers_module_1 = require("./lodgers/lodgers.module");
const rents_module_1 = require("./rents/rents.module");
const create_datasource_script_1 = require("./scripts/create-datasource.script");
let AppModule = class AppModule {
    constructor() {
        (0, create_datasource_script_1.createDataSourceConfig)();
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.userModule,
            estates_module_1.EstatesModule,
            owners_module_1.OwnersModule,
            lodgers_module_1.LodgersModule,
            rents_module_1.RentsModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: typeorm_service_1.TypeOrmConfigService,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [])
], AppModule);
//# sourceMappingURL=app.module.js.map