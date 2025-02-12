"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillSpreadSheetCells = exports.buildSpreadsheetContext = void 0;
const rents_spreadsheets_utils_1 = require("./rents.spreadsheets.utils");
const buildSpreadsheetContext = async (sheetStrategy, id, estates, startDate, endDate) => {
    try {
        let spreadSheet = await sheetStrategy.getSpreadSheet(id);
        let hasBeenRemoved = id && !spreadSheet;
        const years = (0, rents_spreadsheets_utils_1.getYearsFromDates)(startDate, endDate);
        if (spreadSheet) {
            spreadSheet = await createMissingSheets(sheetStrategy, spreadSheet, estates, years);
            spreadSheet = await addMissingEstatesInSheets(sheetStrategy, spreadSheet, estates);
            spreadSheet = await removeEstatesInSheets(sheetStrategy, spreadSheet, estates);
            return { spreadSheet, hasBeenRemoved };
        }
        else {
            spreadSheet = await sheetStrategy.createSpreadSheet('biens_locatifs');
            spreadSheet = await sheetStrategy.addSheets(spreadSheet.id, years.map(year => ({ title: year, header: [...rents_spreadsheets_utils_1.EstatesSheetsHeader], rows: (0, rents_spreadsheets_utils_1.convertEstatesToSheetRows)(estates) })));
        }
        return { spreadSheet, hasBeenRemoved };
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
exports.buildSpreadsheetContext = buildSpreadsheetContext;
const fillSpreadSheetCells = async (sheetStrategy, spreadSheet, rents, estates) => {
    const updateCells = (0, rents_spreadsheets_utils_1.getPaidUpdatesRentsCells)(spreadSheet, rents, estates);
    spreadSheet = await sheetStrategy.updateCells(spreadSheet, updateCells);
    return spreadSheet;
};
exports.fillSpreadSheetCells = fillSpreadSheetCells;
const removeEstatesInSheets = async (sheetStrategy, spreadSheet, estates) => {
    const rowsToRemove = (0, rents_spreadsheets_utils_1.getUnusedEstates)(spreadSheet, estates);
    if (rowsToRemove.length) {
        spreadSheet = await sheetStrategy.removeRowsInSheets(spreadSheet.id, rowsToRemove.map(rows => ({ Adresse: rows.street, Ville: rows.city, Lot: rows.plot })));
    }
    return spreadSheet;
};
const addMissingEstatesInSheets = async (sheetStrategy, spreadSheet, estates) => {
    const missingRows = (0, rents_spreadsheets_utils_1.getMissingRows)(spreadSheet, estates);
    spreadSheet = await sheetStrategy.addRowsInSheets(spreadSheet.id, missingRows);
    return spreadSheet;
};
const createMissingSheets = async (sheetStrategy, spreadSheet, estates, years) => {
    const sheets = await sheetStrategy.getSheets(spreadSheet.id);
    const missingSheetsTitles = (0, rents_spreadsheets_utils_1.getMissingSheetsTitles)(sheets, years);
    while (missingSheetsTitles.length > 0) {
        spreadSheet = await sheetStrategy.addSheet(spreadSheet.id, missingSheetsTitles.pop(), rents_spreadsheets_utils_1.EstatesSheetsHeader, (0, rents_spreadsheets_utils_1.convertEstatesToSheetRows)(estates));
    }
    return spreadSheet;
};
//# sourceMappingURL=rents.spreadsheets.business.js.map