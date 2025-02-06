"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreadsheets_utils_1 = require("../../../spreadsheets/spreadsheets.utils");
const spreadsheets_mocked_strategy_1 = require("../../../spreadsheets/strategies/spreadsheets.mocked.strategy");
const spreadsheets_prospection_utils_1 = require("../utils/spreadsheets.prospection.utils");
const prospections_mocked_1 = require("./mocks/prospections.mocked");
const sellers_mocked_1 = require("./mocks/sellers.mocked");
describe('test spreadsheets prospections utils', () => {
    const mockedSpreadSheetStrategy = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
    let spreadSheetId;
    let spreadSheet;
    beforeAll(async () => {
        spreadSheet = await mockedSpreadSheetStrategy.createSpreadSheet('spreadSheetTest');
        spreadSheetId = spreadSheet.id;
        const prospections = (0, spreadsheets_prospection_utils_1.formatProspections)([{ ...prospections_mocked_1.ProspectionMocked1 }], [{ ...sellers_mocked_1.sellerMocked1 }]);
        const prospectionsCells = (0, spreadsheets_prospection_utils_1.convertProspectionToCells)(prospections[0]);
        const sellers = [{ ...sellers_mocked_1.sellerMocked1 }];
        const sellersCells = (0, spreadsheets_prospection_utils_1.convertSellerToCells)(sellers[0]);
        spreadSheet = await mockedSpreadSheetStrategy.addSheets('spreadSheetTest', [
            { title: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0], header: (0, spreadsheets_prospection_utils_1.getHeader)(spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0]), rows: [prospectionsCells] },
            { title: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1], header: (0, spreadsheets_prospection_utils_1.getHeader)(spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1]), rows: [sellersCells] }
        ]);
    });
    it('should return a cell to update', async () => {
        const prospectionBuilded = (0, spreadsheets_prospection_utils_1.formatProspections)([prospections_mocked_1.ProspectionMocked1], [sellers_mocked_1.sellerMocked1])[0];
        const linkIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'lien');
        const addressIndex = spreadSheet.sheets[0].rows[0].findIndex(cell => cell.value === 'adresse');
        expect(spreadSheet.sheets[0].rows[1][linkIndex]?.value).toEqual(prospections_mocked_1.ProspectionMocked1.link);
        const cellsUpdates = (0, spreadsheets_prospection_utils_1.getProspectionsCellsUpdates)(spreadSheet, [{ ...prospectionBuilded, address: 'new address' }]);
        const column = (0, spreadsheets_utils_1.convertColumnIndexToLetter)(addressIndex);
        expect(cellsUpdates[0].cell).toEqual(`${column}2`);
    });
    it('should return a seller cell to update', async () => {
        const spreadSheet = await mockedSpreadSheetStrategy.getSpreadSheet(spreadSheetId);
        const addressColumnIndex = spreadSheet.sheets[1].rows[0].findIndex(cell => cell.value === 'adresse');
        const cellsUpdates = (0, spreadsheets_prospection_utils_1.getSellersCellsUpdates)(spreadSheet, [{ ...sellers_mocked_1.sellerMocked1, address: 'new address' }]);
        const column = (0, spreadsheets_utils_1.convertColumnIndexToLetter)(addressColumnIndex);
        expect(cellsUpdates[0].cell).toEqual(`${column}2`);
        expect(cellsUpdates[0].value).toEqual('new address');
    });
});
//# sourceMappingURL=utils.spreadsheets.prospection.spec.js.map