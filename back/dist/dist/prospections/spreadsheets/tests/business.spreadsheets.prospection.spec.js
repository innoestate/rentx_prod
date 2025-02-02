"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prospection_dto_1 = require("../../../prospections/dto/prospection.dto");
const spreadsheets_mocked_strategy_1 = require("../../../spreadsheets/strategies/spreadsheets.mocked.strategy");
const spreadsheets_prospection_business_1 = require("../spreadsheets.prospection.business");
const spreadsheets_prospection_utils_1 = require("../spreadsheets.prospection.utils");
const prospections_mocked_1 = require("./mocks/prospections.mocked");
const sellers_mocked_1 = require("./mocks/sellers.mocked");
describe('test spreadsheets prospections service', () => {
    const mockedSpreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
    const userId = '1234';
    let spreadSheetId;
    it('should create a spreadsheet with all the sheets', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.createProspectionsSpreadsheet)(mockedSpreadSheetStrategy, userId);
        spreadSheetId = spreadSheet.id;
        expect(spreadSheet.sheets.length).toBe(3);
        expect(spreadSheet.sheets[0].title).toBe(spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0]);
        expect(spreadSheet.sheets[1].title).toBe(spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1]);
        expect(spreadSheet.sheets[2].title).toBe(spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[2]);
        expect(spreadSheet.sheets[0].rows[0].find(cell => cell.value === 'lien')?.value).toBe('lien');
    });
    it('should update the spreadsheet with the new prospection', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }], [{ ...sellers_mocked_1.sellerMocked1 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(2);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === prospections_mocked_1.ProspectionMocked1.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === sellers_mocked_1.sellerMocked1.name)?.value).toBeTruthy();
        const statusIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'status');
        expect(spreadSheet.sheets[0].rows[1][statusIndex]?.value).toBe('Contacté');
        const emailIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'email');
        expect(spreadSheet.sheets[0].rows[1][emailIndex]?.value).toBe(sellers_mocked_1.sellerMocked1.email);
    });
    it('should add another prospection', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked2 }], [{ ...sellers_mocked_1.sellerMocked2 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === prospections_mocked_1.ProspectionMocked2.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === sellers_mocked_1.sellerMocked2.phone)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === sellers_mocked_1.sellerMocked2.name)?.value).toBeTruthy();
    });
    it('should not add the prospection that already exists', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }], [{ ...sellers_mocked_1.sellerMocked1 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
    });
    it('should not add the prospection that already exists', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }, { ...prospections_mocked_1.ProspectionMocked2 }], [{ ...sellers_mocked_1.sellerMocked1 }, { ...sellers_mocked_1.sellerMocked2 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[1].rows.length).toBe(3);
    });
    it('should add only the prospection that not already exists', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }, { ...prospections_mocked_1.ProspectionMocked2 }, { ...prospections_mocked_1.ProspectionMocked3 }], []);
        expect(spreadSheet.sheets[0].rows.length).toBe(4);
        expect(spreadSheet.sheets[0].rows[3].find(cell => cell.value === prospections_mocked_1.ProspectionMocked3.address)?.value).toBeTruthy();
    });
    it('should add sellers that not already exists', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }, { ...prospections_mocked_1.ProspectionMocked2 }, { ...prospections_mocked_1.ProspectionMocked3 }], [{ ...sellers_mocked_1.sellerMocked1 }, { ...sellers_mocked_1.sellerMocked2 }, { ...sellers_mocked_1.sellerMocked3 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(4);
        expect(spreadSheet.sheets[0].rows[3].find(cell => cell.value === prospections_mocked_1.ProspectionMocked3.address)?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows.length).toBe(4);
        expect(spreadSheet.sheets[1].rows[3].find(cell => cell.value === sellers_mocked_1.sellerMocked3.name)?.value).toBeTruthy();
    });
    it('should update a cell in a prospection', async () => {
        const prospectionBuilded = (0, spreadsheets_prospection_utils_1.formatProspections)([prospections_mocked_1.ProspectionMocked1], [sellers_mocked_1.sellerMocked1])[0];
        const spreadSheet = await (0, spreadsheets_prospection_business_1.updateProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospectionBuilded, address: 'new address' }]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address')?.value).toBeTruthy();
    });
    it('should update 2 cells in a prospection', async () => {
        const prospectionBuilded = (0, spreadsheets_prospection_utils_1.formatProspections)([{ ...prospections_mocked_1.ProspectionMocked1, address: 'new address 2', status: 'Pending' }], [sellers_mocked_1.sellerMocked1])[0];
        const spreadSheet = await (0, spreadsheets_prospection_business_1.updateProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [prospectionBuilded]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address 2')?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === prospection_dto_1.PropertyStatusTranslation['Pending'])?.value).toBeTruthy();
    });
    it('should update 2 and 1 cells in 2 prospections', async () => {
        const prospectionBuilded = (0, spreadsheets_prospection_utils_1.formatProspections)([{ ...prospections_mocked_1.ProspectionMocked1, address: 'new address 1', status: 'Accepted' }], [sellers_mocked_1.sellerMocked1])[0];
        const prospectionBuilded2 = (0, spreadsheets_prospection_utils_1.formatProspections)([{ ...prospections_mocked_1.ProspectionMocked2, address: 'address modified', status: 'Accepted' }], [sellers_mocked_1.sellerMocked2])[0];
        const spreadSheet = await (0, spreadsheets_prospection_business_1.updateProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [prospectionBuilded, prospectionBuilded2]);
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === 'new address 1')?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[1].find(cell => cell.value === prospection_dto_1.PropertyStatusTranslation['Accepted'])?.value).toBeTruthy();
        expect(spreadSheet.sheets[0].rows[2].find(cell => cell.value === 'address modified')?.value).toBeTruthy();
    });
    it('should remove a prospection and add it in archives', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.removeProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[2].rows.length).toBe(2);
    });
    it('should not remove a prospection that already has been removed', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.removeProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }]);
        expect(spreadSheet.sheets[0].rows.length).toBe(3);
        expect(spreadSheet.sheets[2].rows.length).toBe(2);
    });
    it('should update a seller', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.updateSellersSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...sellers_mocked_1.sellerMocked1, address: 'new address' }]);
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'new address')?.value).toBeTruthy();
    });
    it('should update 2 row in 2 sellers', async () => {
        const spreadSheet = await (0, spreadsheets_prospection_business_1.updateSellersSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...sellers_mocked_1.sellerMocked1, address: 'address modified', email: 'newEmail@test.com' }, { ...sellers_mocked_1.sellerMocked2, address: 'new address 2', email: 'newEmail2@test.com' }]);
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'address modified')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[1].find(cell => cell.value === 'newEmail@test.com')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === 'new address 2')?.value).toBeTruthy();
        expect(spreadSheet.sheets[1].rows[2].find(cell => cell.value === 'newEmail2@test.com')?.value).toBeTruthy();
    });
    it('should convert cells to prospections', async () => {
        let spreadSheet = await (0, spreadsheets_prospection_business_1.createProspectionsSpreadsheet)(mockedSpreadSheetStrategy, userId);
        spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }], []);
        const prospection = (0, spreadsheets_prospection_utils_1.convertCellsToSuperficialProspection)(spreadSheet.sheets[0].rows[1]);
        expect(prospection?.link).toBe(prospections_mocked_1.ProspectionMocked1.link);
    });
    it('should return the prospection that have to be removed', async () => {
        let spreadSheet = await (0, spreadsheets_prospection_business_1.createProspectionsSpreadsheet)(mockedSpreadSheetStrategy, userId);
        spreadSheet = await (0, spreadsheets_prospection_business_1.addProspectionsSpreadsheet)(mockedSpreadSheetStrategy, spreadSheetId, [{ ...prospections_mocked_1.ProspectionMocked1 }], []);
        const prospectionsToRemove = (0, spreadsheets_prospection_utils_1.getProspectionsInRowsThatAreNotInProspections)(spreadSheet, []);
        expect(prospectionsToRemove.length).toBe(1);
        expect(prospectionsToRemove[0].link).toBe(prospections_mocked_1.ProspectionMocked1.link);
    });
});
//# sourceMappingURL=business.spreadsheets.prospection.spec.js.map