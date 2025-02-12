"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreadsheets_mocked_strategy_1 = require("../../../spreadsheets/strategies/spreadsheets.mocked.strategy");
const estates_mocks_1 = require("../../tests/estates.mocks");
const rents_mocks_1 = require("../../tests/rents.mocks");
const rents_spreadsheets_business_1 = require("../rents.spreadsheets.business");
const rents_spreadsheets_utils_1 = require("../rents.spreadsheets.utils");
describe('test rents spreadsheets updates', () => {
    let mockedGoogleWorker = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
    it('should full a spreadsheet with one rent', async () => {
        mockedGoogleWorker = new spreadsheets_mocked_strategy_1.MockedGoogleSpreadSheetStrategy();
        const rents = [{ ...rents_mocks_1.rent2021_01 }];
        const estates = [{ ...estates_mocks_1.estate1 }];
        let { spreadSheet } = await (0, rents_spreadsheets_business_1.buildSpreadsheetContext)(mockedGoogleWorker, null, estates, new Date('2021-01-01'), new Date('2021-01-31'));
        const updateCells = (0, rents_spreadsheets_utils_1.getPaidUpdatesRentsCells)(spreadSheet, rents, estates);
        spreadSheet = await mockedGoogleWorker.updateCells(spreadSheet, updateCells);
        expect(spreadSheet.sheets[0].rows[1][5].value).toEqual(1100);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.green).toEqual(1);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.red).toEqual(0);
        expect(spreadSheet.sheets[0].rows[1][5].backgroundColor.blue).toEqual(0);
    });
});
//# sourceMappingURL=spreadsheets.update-cells.spreadsheets.rents.spec.js.map