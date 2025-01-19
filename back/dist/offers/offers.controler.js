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
exports.OffersController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_guard_1 = require("../auth/auth.guard");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const prospections_db_service_1 = require("../prospections/services/prospections.db.service");
const offers_db_service_1 = require("./services/offers.db.service");
const offers_service_1 = require("./services/offers.service");
let OffersController = class OffersController {
    constructor(offersService, offersServiceDb, prospectionsDbService, configService) {
        this.offersService = offersService;
        this.offersServiceDb = offersServiceDb;
        this.prospectionsDbService = prospectionsDbService;
        this.configService = configService;
    }
    async createOffer(body, req) {
        const price = req.query.price;
        const prospection_id = req.query.prospection_id;
        const offerDto = await this.offersService.addOffer(req.user?.id, prospection_id, { price, prospection_id }, body.file, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
        return offerDto;
    }
    async findAllOffers(req) {
        return await this.offersServiceDb.findAllByUser(req.user?.id);
    }
};
exports.OffersController = OffersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "createOffer", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OffersController.prototype, "findAllOffers", null);
exports.OffersController = OffersController = __decorate([
    (0, common_1.Controller)('api/prospections/offers'),
    __metadata("design:paramtypes", [offers_service_1.OffersService,
        offers_db_service_1.OffersDbService,
        prospections_db_service_1.ProspectionsDbService,
        config_1.ConfigService])
], OffersController);
//# sourceMappingURL=offers.controler.js.map