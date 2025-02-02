"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prospectionsSpreadsheetTests = void 0;
const rxjs_1 = require("rxjs");
const request = require("supertest");
const prospections_mocked_1 = require("../../prospections/spreadsheets/tests/mocks/prospections.mocked");
const db_utils_1 = require("../utils/db.utils");
const prospectionsSpreadsheetTests = (getApp, getUser, getDocsDbService) => {
    let spreadsheetId;
    it('should create a spreadsheet with one prospection', async () => {
        await (0, db_utils_1.emptyingTable)('prospections');
        await (0, db_utils_1.emptyingTable)('sellers');
        await (0, db_utils_1.emptyingTable)('docs');
        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService();
        const prospectionMockedDto = { ...prospections_mocked_1.ProspectionMocked1 };
        delete prospectionMockedDto.id;
        delete prospectionMockedDto.seller_id;
        delete prospectionMockedDto.offer_id;
        const docsT = await (0, rxjs_1.firstValueFrom)(docsDbService.getByUser(user.id));
        await request(app.getHttpServer())
            .post('/api/prospections')
            .send(prospectionMockedDto)
            .expect(201);
        const docs = await (0, rxjs_1.firstValueFrom)(docsDbService.getByUser(user.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].prospections_google_sheet_id).toBeTruthy();
        spreadsheetId = docs[0].prospections_google_sheet_id;
    });
    it('should get the prospection spreadsheet', async () => {
        const app = getApp();
        const user = getUser();
        const docsDbService = getDocsDbService();
        const prospectionMockedDto = { ...prospections_mocked_1.ProspectionMocked2 };
        delete prospectionMockedDto.id;
        delete prospectionMockedDto.seller_id;
        delete prospectionMockedDto.offer_id;
        await request(app.getHttpServer())
            .post('/api/prospections')
            .send(prospectionMockedDto)
            .expect(201);
        const docs = await (0, rxjs_1.firstValueFrom)(docsDbService.getByUser(user.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].prospections_google_sheet_id).toEqual(spreadsheetId);
    });
};
exports.prospectionsSpreadsheetTests = prospectionsSpreadsheetTests;
//# sourceMappingURL=prospection.spreadsheets-tests.js.map