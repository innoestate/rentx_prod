"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentsServiceTests = void 0;
const spreadsheets_mocked_strategy_1 = require("../rents/spreadsheets/strategies/spreadsheets.mocked.strategy");
const request = require("supertest");
const rxjs_1 = require("rxjs");
const rentsServiceTests = (getApp, getRentsService) => {
    let user = null;
    let estate = null;
    let spreadSheetId = null;
    it('addToExcel test', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const fakeSpreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        const response = await request(app.getHttpServer())
            .get('/api/user/profile')
            .expect(200);
        user = response.body;
        expect(user.email).toBe('elon.musk@spacex.io');
        const spreadSheet = await (0, rxjs_1.lastValueFrom)(rentService.addPeriodToExcel(user.id, '0', new Date('2024-01-01'), new Date('2024-01-31'), fakeSpreadSheetStrategy));
        spreadSheetId = spreadSheet.rents_google_sheet_id;
        expect(spreadSheet).not.toBeNull();
    });
    it('override sheet test', async () => {
        const rentService = getRentsService();
        const fakeSpreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        const spreadSheetOverrided = await (0, rxjs_1.lastValueFrom)(rentService.addPeriodToExcel(user.id, '0', new Date('2024-01-01'), new Date('2024-01-31'), fakeSpreadSheetStrategy));
        expect(spreadSheetOverrided.rents_google_sheet_id).toEqual(spreadSheetId);
    });
};
exports.rentsServiceTests = rentsServiceTests;
//# sourceMappingURL=rents.service-tests.js.map