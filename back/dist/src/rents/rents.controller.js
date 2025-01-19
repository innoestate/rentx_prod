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
exports.RentsController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/auth.guard");
const estates_service_1 = require("../estates/estates.service");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const lodgers_service_1 = require("../lodgers/lodgers.service");
const owners_service_1 = require("../owners/owners.service");
const rent_receipts_business_1 = require("./rent-receipts/rent-receipts.business");
const rents_service_1 = require("./services/rents.service");
let RentsController = class RentsController {
    constructor(estateService, ownerService, lodgerService, configService, rentsService) {
        this.estateService = estateService;
        this.ownerService = ownerService;
        this.lodgerService = lodgerService;
        this.configService = configService;
        this.rentsService = rentsService;
    }
    downloadPdfRentReceipt(req, res) {
        try {
            const { estate, owner, lodger, startDate } = req.body;
            return (0, rxjs_1.from)((0, rent_receipts_business_1.createRentReciptPdf)(estate, owner, lodger, startDate)).pipe((0, rxjs_1.map)(rentReceipt => {
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
                res.send(rentReceipt);
            }));
        }
        catch (error) {
            console.log('error', error);
            return (0, rxjs_1.of)(res.send({ statusCode: 500, body: 'error' }));
        }
    }
    getRents(req, res) {
        return this.rentsService.getMonthlyRents(req.user.id).pipe((0, rxjs_1.map)(rents => {
            res.send(rents);
        }));
    }
    downloadRentReceipt(req, res) {
        const id = req.query.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const { accessToken, refresh_token } = req.user;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        return (0, rxjs_1.combineLatest)([
            this.estateService.getById(id),
            this.ownerService.getByUser(req.user.id),
            this.lodgerService.getByUser(req.user.id)
        ]).pipe((0, rxjs_1.switchMap)(([estate, owners, lodgers]) => {
            const owner = owners.find(owner => owner.id === estate.owner_id);
            const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
            return this.rentsService.buildRentReciptPdf(req.user.id, estate, owner, { ...lodger, email: req.user.email }, startDate, endDate, accessToken, refresh_token, clientId, clientSecret);
        }), (0, rxjs_1.map)(rentReceipt => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
            res.send(rentReceipt);
        }));
    }
    sendRentReceipt(req, res) {
        const estateId = req.query?.estate;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const { accessToken, refresh_token } = req.user;
        const clientId = this.configService.get('GOOGLE_CLIENT_ID');
        const clientSecret = this.configService.get('GOOGLE_CLIENT_SECRET');
        return this.rentsService.SendRentReceiptByEmail(req.user.id, estateId, accessToken, refresh_token, clientId, clientSecret, startDate, endDate).pipe((0, rxjs_1.map)(_ => res.send({ statusCode: 200, body: 'email sent' })));
    }
    synchronizeSheets(req, res) {
        return this.rentsService.synchronizeRentsInGoogleSheet(req.user.id, req.user.accessToken, req.user.refresh_token, this.configService.get('GOOGLE_CLIENT_ID'), this.configService.get('GOOGLE_CLIENT_SECRET')).pipe((0, rxjs_1.map)(result => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=quittance.pdf');
            res.send(result);
        }));
    }
};
exports.RentsController = RentsController;
__decorate([
    (0, common_1.Post)('downloadPdf'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RentsController.prototype, "downloadPdfRentReceipt", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RentsController.prototype, "getRents", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('pdf'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RentsController.prototype, "downloadRentReceipt", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('email'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RentsController.prototype, "sendRentReceipt", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('sheets'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RentsController.prototype, "synchronizeSheets", null);
exports.RentsController = RentsController = __decorate([
    (0, common_1.Controller)('api/rents'),
    __metadata("design:paramtypes", [estates_service_1.EstatesService, owners_service_1.OwnersService, lodgers_service_1.LodgersService, config_1.ConfigService, rents_service_1.RentsService])
], RentsController);
//# sourceMappingURL=rents.controller.js.map