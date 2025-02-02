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
exports.SpreadSheetsProspectionsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const docs_db_service_1 = require("../../../docs/docs.db.service");
const spreadsheets_google_strategy_1 = require("../../../spreadsheets/strategies/spreadsheets.google.strategy");
const spreadsheets_mocked_strategy_1 = require("../../../spreadsheets/strategies/spreadsheets.mocked.strategy");
const prospections_utils_1 = require("../../prospections.utils");
const prospections_db_service_1 = require("../../services/prospections.db.service");
const sellers_db_service_1 = require("../../services/sellers.db.service");
const spreadsheets_prospection_business_1 = require("../../spreadsheets/spreadsheets.prospection.business");
let SpreadSheetsProspectionsService = class SpreadSheetsProspectionsService {
    constructor(ProspectionsDbService, sellersServicer, docsServices, configService) {
        this.ProspectionsDbService = ProspectionsDbService;
        this.sellersServicer = sellersServicer;
        this.docsServices = docsServices;
        this.configService = configService;
    }
    async runOrNotSynchronizationWithDelay(userDoc, callbackDoJob, callBackDoNothing) {
        if (this.configService.get('NODE_ENV') === 'test') {
            callbackDoJob(true);
            return true;
        }
        if (userDoc?.lastSynchronization) {
            const lastSynchronization = new Date(userDoc.lastSynchronization);
            if ((0, prospections_utils_1.getLastSpreadSheetSynchronization)(lastSynchronization.getTime()) > 0) {
                const nextMinute = (0, prospections_utils_1.getNextSpreadSheetSynchronization)();
                this.docsServices.update({ id: userDoc.id, lastSynchronization: nextMinute });
                setTimeout(() => {
                    callbackDoJob(true);
                }, nextMinute.getTime() - Date.now());
                return true;
            }
            else {
                callBackDoNothing(true);
                return false;
            }
        }
        else {
            callbackDoJob(true);
            return true;
        }
    }
    async synchronizeGoogleSheet(user_id, accessToken, refreshToken, clientId, clientSecret) {
        try {
            const userDoc = (await (0, rxjs_1.lastValueFrom)(this.docsServices.getByUser(user_id)))?.[0];
            this.runOrNotSynchronizationWithDelay(userDoc, async (doTheJob) => {
                const prospections = await this.ProspectionsDbService.findAll(user_id);
                const sellers = await this.sellersServicer.findAllSellers(user_id);
                const googleSheetId = userDoc?.prospections_google_sheet_id;
                let googleStrategy;
                if (this.configService.get('NODE_ENV') === 'test') {
                    googleStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
                }
                else {
                    googleStrategy = new spreadsheets_google_strategy_1.SpreadSheetGoogleStrategy();
                    await googleStrategy.init(accessToken, refreshToken, clientId, clientSecret);
                }
                const spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(googleStrategy, prospections, sellers, googleSheetId);
                if (!googleSheetId) {
                    if (!userDoc) {
                        await (0, rxjs_1.lastValueFrom)(this.docsServices.create({
                            user_id,
                            prospections_google_sheet_id: spreadSheet.id,
                            lastSynchronization: new Date()
                        }));
                    }
                    else {
                        await (0, rxjs_1.lastValueFrom)(this.docsServices.update({
                            id: userDoc.id,
                            prospections_google_sheet_id: spreadSheet.id,
                            lastSynchronization: new Date()
                        }));
                    }
                }
                else if (googleSheetId !== spreadSheet.id) {
                    await (0, rxjs_1.lastValueFrom)(this.docsServices.update({
                        id: userDoc.id,
                        prospections_google_sheet_id: spreadSheet.id,
                        lastSynchronization: new Date()
                    }));
                }
            }, doNothing => {
                console.log('a synchronization is already scheduled');
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.SpreadSheetsProspectionsService = SpreadSheetsProspectionsService;
exports.SpreadSheetsProspectionsService = SpreadSheetsProspectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prospections_db_service_1.ProspectionsDbService, sellers_db_service_1.SellersDbService, docs_db_service_1.DocsDbService, config_1.ConfigService])
], SpreadSheetsProspectionsService);
//# sourceMappingURL=spreadsheets.prospections.service.js.map