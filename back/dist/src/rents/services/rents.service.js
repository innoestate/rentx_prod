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
exports.RentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const emails_buisness_1 = require("../../emails/emails.buisness");
const docs_db_service_1 = require("../../docs/docs.db.service");
const estates_service_1 = require("../../estates/estates.service");
const lodgers_service_1 = require("../../lodgers/lodgers.service");
const owners_service_1 = require("../../owners/owners.service");
const rent_receipts_business_1 = require("../rent-receipts/rent-receipts.business");
const rents_db_service_1 = require("./rents.db.service");
const rents_utils_1 = require("../rents.utils");
const rents_spreadsheets_business_1 = require("../spreadsheets/rents.spreadsheets.business");
const spreadsheets_google_strategy_1 = require("../spreadsheets/strategies/spreadsheets.google.strategy");
let RentsService = class RentsService {
    constructor(config, rentsDbService, docsDbService, estateService, ownerService, lodgerService) {
        this.config = config;
        this.rentsDbService = rentsDbService;
        this.docsDbService = docsDbService;
        this.estateService = estateService;
        this.ownerService = ownerService;
        this.lodgerService = lodgerService;
    }
    buildRentReciptPdf(userId, estate, owner, lodger, startDate_, endDate_, accessToken, refreshToken, clientId, clientSecret) {
        const { startDate, endDate, rent, charges } = (0, rent_receipts_business_1.getRentReceiptInfos)(estate, owner, lodger, startDate_, endDate_);
        return (0, rxjs_1.from)(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: lodger.id, start_date: startDate, end_date: endDate, rent, charges })).pipe((0, rxjs_1.tap)(_ => this.synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret).pipe((0, rxjs_1.take)(1)).subscribe()), (0, rxjs_1.switchMap)(_ => (0, rxjs_1.from)((0, rent_receipts_business_1.createRentReciptPdf)(estate, owner, lodger, startDate_, endDate_))), (0, rxjs_1.catchError)(_ => (0, rxjs_1.from)((0, rent_receipts_business_1.createRentReciptPdf)(estate, owner, lodger, startDate_, endDate_))));
    }
    SendRentReceiptByEmail(userId, estateId, accessToken, refreshToken, clientId, clientSecret, startDate_, endDate_) {
        return (0, rxjs_1.from)(this.getFullEstates(userId)).pipe((0, rxjs_1.switchMap)(estates => {
            const estate = estates.find(estate => estate.id === estateId);
            const { startDate, endDate } = (0, rent_receipts_business_1.getRentReceiptInfos)(estate, estate.owner, estate.lodger, startDate_, endDate_);
            return (0, rxjs_1.from)(this.rentsDbService.create({ user_id: userId, estate_id: estate.id, lodger_id: estate.lodger_id, start_date: startDate, end_date: endDate, rent: estate.rent, charges: estate.charges, sent: true })).pipe((0, rxjs_1.tap)(_ => this.synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret).pipe((0, rxjs_1.take)(1)).subscribe()), (0, rxjs_1.switchMap)(_ => (0, rxjs_1.from)((0, rent_receipts_business_1.createRentReceiptEmail)(estate, startDate, endDate))), (0, rxjs_1.switchMap)(base64EncodedEmail => (0, emails_buisness_1.sendEmail)(accessToken, refreshToken, base64EncodedEmail, clientId, clientSecret)), (0, rxjs_1.catchError)(_ => (0, rxjs_1.of)(null)));
        }));
    }
    synchronizeRentsInGoogleSheet(userId, accessToken, refreshToken, clientId, clientSecret) {
        if (!accessToken || !refreshToken || !clientId || !clientSecret)
            return (0, rxjs_1.of)(null);
        const spreadSheetStrategy = new spreadsheets_google_strategy_1.SpreadSheetGoogleStrategy();
        return (0, rxjs_1.from)(spreadSheetStrategy.init(accessToken, refreshToken, clientId, clientSecret)).pipe((0, rxjs_1.switchMap)(_ => this.getFullEstates(userId)), (0, rxjs_1.switchMap)((estates) => (0, rxjs_1.combineLatest)([(0, rxjs_1.of)(estates), this.rentsDbService.getByUserId(userId), this.getSpreadSheetId(userId)])), (0, rxjs_1.switchMap)(([estates, rents, spreadSheetId]) => (0, rxjs_1.combineLatest)([(0, rxjs_1.of)(estates), (0, rxjs_1.of)(rents), (0, rxjs_1.from)((0, rents_spreadsheets_business_1.buildSpreadsheetContext)(spreadSheetStrategy, spreadSheetId, estates, (0, rents_utils_1.getStartAndEnDatesFromRents)(rents).startDate, (0, rents_utils_1.getStartAndEnDatesFromRents)(rents).endDate))])), (0, rxjs_1.switchMap)(([estates, rents, { spreadSheet, hasBeenRemoved }]) => (0, rxjs_1.combineLatest)([(0, rxjs_1.of)(hasBeenRemoved), (0, rxjs_1.from)((0, rents_spreadsheets_business_1.fillSpreadSheetCells)(spreadSheetStrategy, spreadSheet, rents, estates))])), (0, rxjs_1.switchMap)(([hasBeenRemoved, spreadSheet]) => this.saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved)), (0, rxjs_1.catchError)(err => {
            console.error(err);
            return (0, rxjs_1.of)(null);
        }));
    }
    getMonthlyRents(userId) {
        return (0, rxjs_1.combineLatest)([this.rentsDbService.getByUserId(userId), this.getFullEstates(userId)]).pipe((0, rxjs_1.map)(([rents, estates]) => ([rents, (0, rents_utils_1.fusionateRents)(rents, estates)])), (0, rxjs_1.map)(([rentsFromDb, fusionnedRents]) => (0, rents_utils_1.getRentsByMonth)(fusionnedRents, rentsFromDb)));
    }
    getSpreadSheetId(userId) {
        return this.docsDbService.getByUser(userId).pipe((0, rxjs_1.map)(docs => {
            return docs[0]?.rents_google_sheet_id;
        }));
    }
    saveSpreadSheetId(userId, spreadSheet, hasBeenRemoved) {
        if (hasBeenRemoved) {
            return this.docsDbService.deleteByUserId(userId).pipe((0, rxjs_1.switchMap)(_ => this.docsDbService.create({ user_id: userId, rents_google_sheet_id: spreadSheet.id })));
        }
        else {
            return this.docsDbService.getByUser(userId).pipe((0, rxjs_1.switchMap)(docs => {
                if (docs && docs.length > 0) {
                    return (0, rxjs_1.of)(docs[0]);
                }
                else {
                    return this.docsDbService.create({ user_id: userId, rents_google_sheet_id: spreadSheet.id });
                }
            }));
        }
    }
    getFullEstates(userId) {
        return (0, rxjs_1.combineLatest)([this.estateService.getByUser(userId), this.ownerService.getByUser(userId), this.lodgerService.getByUser(userId)]).pipe((0, rxjs_1.map)(([estates, owners, lodgers]) => estates.map(estate => {
            const owner = owners.find(owner => owner.id === estate.owner_id);
            const lodger = lodgers.find(lodger => lodger.id === estate.lodger_id);
            return { ...estate, owner, lodger };
        })));
    }
};
exports.RentsService = RentsService;
exports.RentsService = RentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, rents_db_service_1.RentsDbService, docs_db_service_1.DocsDbService, estates_service_1.EstatesService, owners_service_1.OwnersService, lodgers_service_1.LodgersService])
], RentsService);
//# sourceMappingURL=rents.service.js.map