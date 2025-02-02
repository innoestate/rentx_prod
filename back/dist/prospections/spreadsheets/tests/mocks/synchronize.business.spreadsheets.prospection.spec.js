"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreadsheets_mocked_strategy_1 = require("../../../../spreadsheets/strategies/spreadsheets.mocked.strategy");
const spreadsheets_prospection_business_1 = require("../../spreadsheets.prospection.business");
const prospections_mocked_1 = require("./prospections.mocked");
const sellers_mocked_1 = require("./sellers.mocked");
describe('test spreadsheets synchronization business', () => {
    let spreadSheet;
    it('should return a spreadsheet with an id', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [], []);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets?.length).toBe(3);
    });
    it('should return a spreadsheet with the existing id', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [], []);
        expect(spreadSheet?.id).toEqual(spreadSheet.id);
        expect(spreadSheet?.sheets?.length).toBe(3);
    });
    it('should return a spreadsheet with 1 prospection and one seller', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        const prospections = [{ ...prospections_mocked_1.ProspectionMocked1 }];
        const sellers = [{ ...sellers_mocked_1.sellerMocked1 }];
        const spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, prospections, sellers);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(2);
    });
    it('should return a spreadsheet with the same number of prospections and sellers without doublons', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        let spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [{ ...prospections_mocked_1.ProspectionMocked1 }], [{ ...sellers_mocked_1.sellerMocked1 }]);
        spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [{ ...prospections_mocked_1.ProspectionMocked1 }], [{ ...sellers_mocked_1.sellerMocked1 }]);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(2);
    });
    it('should return a spreadsheet with more prospections and sellers', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        const prospections = [{ ...prospections_mocked_1.ProspectionMocked1 }, { ...prospections_mocked_1.ProspectionMocked2 }];
        const sellers = [{ ...sellers_mocked_1.sellerMocked1 }, { ...sellers_mocked_1.sellerMocked2 }];
        const spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, prospections, sellers);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(3);
        expect(spreadSheet?.sheets[1].rows.length).toBe(3);
    });
    it('should return a spreadsheet with an archived prospection', async () => {
        const spreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        let spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [{ ...prospections_mocked_1.ProspectionMocked1 }, { ...prospections_mocked_1.ProspectionMocked2 }], [{ ...sellers_mocked_1.sellerMocked1 }, { ...sellers_mocked_1.sellerMocked2 }]);
        spreadSheet = await (0, spreadsheets_prospection_business_1.synchronizeProspections)(spreadSheetStrategy, [{ ...prospections_mocked_1.ProspectionMocked2 }], [{ ...sellers_mocked_1.sellerMocked1 }, { ...sellers_mocked_1.sellerMocked2 }], spreadSheet.id);
        expect(spreadSheet?.id).toBeDefined();
        expect(spreadSheet?.sheets[0].rows.length).toBe(2);
        expect(spreadSheet?.sheets[1].rows.length).toBe(3);
        expect(spreadSheet?.sheets[2].rows.length).toBe(2);
    });
});
//# sourceMappingURL=synchronize.business.spreadsheets.prospection.spec.js.map