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
exports.ProspectionsController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/auth.guard");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const prospections_utils_1 = require("./prospections.utils");
const prospections_service_1 = require("./services/prospections.service");
const sellers_db_service_1 = require("./services/sellers.db.service");
const spreadsheets_prospections_service_1 = require("./spreadsheets/services/spreadsheets.prospections.service");
let ProspectionsController = class ProspectionsController {
    constructor(prospectionService, spreadSheetService, sellersService, configService) {
        this.prospectionService = prospectionService;
        this.spreadSheetService = spreadSheetService;
        this.sellersService = sellersService;
        this.configService = configService;
    }
    create(createProspectionDto, req) {
        const prospection = (0, prospections_utils_1.formatProspectionDtoForCreation)(req.user?.id, createProspectionDto);
        return this.prospectionService.createNewProspection(prospection, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }
    findAll(req) {
        return this.prospectionService.findAll(req.user?.id);
    }
    findOne(id, req) {
        return this.prospectionService.findOne(id);
    }
    update(id, updateProspectionDto, req) {
        return this.prospectionService.update(id, updateProspectionDto, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }
    remove(id, req) {
        return this.prospectionService.remove(req.user?.id, id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET'));
    }
    createSeller(createSellerDto, req) {
        createSellerDto.user_id = req.user.id;
        return this.sellersService.createSeller(createSellerDto);
    }
    findAllSellers(req) {
        return this.sellersService.findAllSellers(req.user?.id);
    }
    findOneSeller(id) {
        return this.sellersService.findOneSeller(id);
    }
    updateSeller(id, updateSellerDto, req) {
        updateSellerDto.user_id = req.user.id;
        const response = this.sellersService.updateSeller(id, updateSellerDto);
        this.spreadSheetService.synchronizeGoogleSheet(req.user?.id, id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'));
        return response;
    }
    removeSeller(id, req, res) {
        return (0, rxjs_1.from)(this.sellersService.removeSeller(id)).pipe((0, rxjs_1.switchMap)(_ => this.prospectionService.updateMany(req.user?.id, { seller_id: null })), (0, rxjs_1.switchMap)(_ => (0, rxjs_1.of)(res.send({ statusCode: 200, body: 'seller ' + id + ' removed' }))), (0, rxjs_1.tap)(() => this.spreadSheetService.synchronizeGoogleSheet(req.user?.id, id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'))));
    }
};
exports.ProspectionsController = ProspectionsController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)('sellers'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "createSeller", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('sellers/all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "findAllSellers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('sellers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "findOneSeller", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Patch)('sellers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "updateSeller", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Delete)('sellers/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ProspectionsController.prototype, "removeSeller", null);
exports.ProspectionsController = ProspectionsController = __decorate([
    (0, common_1.Controller)('api/prospections'),
    __metadata("design:paramtypes", [prospections_service_1.ProspectionsService,
        spreadsheets_prospections_service_1.SpreadSheetsProspectionsService,
        sellers_db_service_1.SellersDbService,
        config_1.ConfigService])
], ProspectionsController);
//# sourceMappingURL=prospections.controller.js.map