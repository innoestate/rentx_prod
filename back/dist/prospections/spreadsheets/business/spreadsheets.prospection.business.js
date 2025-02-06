"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProspectionsSpreadsheet = exports.updateSellersSpreadsheet = exports.updateProspectionsSpreadsheet = exports.addProspectionsSpreadsheet = exports.createProspectionsSpreadsheet = exports.synchronizeProspections = void 0;
const spreadsheets_prospection_utils_1 = require("../utils/spreadsheets.prospection.utils");
const synchronizeProspections = async (spreadSheetStrategy, prospections, sellers, spreadSheetId) => {
    let spreadSheet;
    if (spreadSheetId) {
        spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    }
    if (!spreadSheet) {
        spreadSheet = await (0, exports.createProspectionsSpreadsheet)(spreadSheetStrategy, spreadsheets_prospection_utils_1.PROSPECTIONS_SPREADSHEETS_TITLE);
    }
    const buildedProspections = (0, spreadsheets_prospection_utils_1.formatProspections)(prospections, sellers);
    const missingProspections = (0, spreadsheets_prospection_utils_1.getMissingProspections)(spreadSheet, buildedProspections);
    spreadSheet = await (0, exports.addProspectionsSpreadsheet)(spreadSheetStrategy, spreadSheet.id, missingProspections, sellers);
    spreadSheet = await (0, exports.updateProspectionsSpreadsheet)(spreadSheetStrategy, spreadSheet.id, buildedProspections);
    console.log('prospections', prospections);
    const prospectionsToRemove = (0, spreadsheets_prospection_utils_1.getProspectionsInRowsThatAreNotInProspections)(spreadSheet, prospections);
    spreadSheet = (await (0, exports.removeProspectionsSpreadsheet)(spreadSheetStrategy, spreadSheet.id, prospectionsToRemove)) || spreadSheet;
    return spreadSheet;
};
exports.synchronizeProspections = synchronizeProspections;
const createProspectionsSpreadsheet = async (spreadSheetStrategy, title) => {
    const spreadSheet = await spreadSheetStrategy.createSpreadSheet(title);
    const sheet1 = {
        title: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0],
        header: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_HEADERS[spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0]].map(value => ({ value, backgroundColor: spreadsheets_prospection_utils_1.HEADER_BACKGROUND_COLOR })),
        rows: []
    };
    const sheet2 = {
        title: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1],
        header: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_HEADERS[spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1]].map(value => ({ value, backgroundColor: spreadsheets_prospection_utils_1.HEADER_BACKGROUND_COLOR })),
        rows: []
    };
    const sheet3 = {
        title: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[2],
        header: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_HEADERS[spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[2]].map(value => ({ value, backgroundColor: spreadsheets_prospection_utils_1.HEADER_BACKGROUND_COLOR })),
        rows: []
    };
    return await spreadSheetStrategy.addSheets(spreadSheet.id, [
        sheet1,
        sheet2,
        sheet3
    ]);
};
exports.createProspectionsSpreadsheet = createProspectionsSpreadsheet;
const addProspectionsSpreadsheet = async (spreadSheetStrategy, spreadSheetId, prospections, sellers) => {
    try {
        let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
        const missingProspections = (0, spreadsheets_prospection_utils_1.getMissingProspections)(spreadSheet, prospections);
        const prospectionCells = (0, spreadsheets_prospection_utils_1.formatProspections)(missingProspections, sellers).map(prospection => (0, spreadsheets_prospection_utils_1.convertProspectionToCells)(prospection));
        const missingSellers = (0, spreadsheets_prospection_utils_1.getMissingSellers)(spreadSheet, sellers);
        const sellerCells = missingSellers.map(seller => (0, spreadsheets_prospection_utils_1.convertSellerToCells)(seller));
        spreadSheet = await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
            { sheetTitle: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0], missingRows: prospectionCells },
            { sheetTitle: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[1], missingRows: sellerCells }
        ]);
        return spreadSheet;
    }
    catch (e) {
        console.error('Error addProspectionsSpreadsheet', e);
        return null;
    }
};
exports.addProspectionsSpreadsheet = addProspectionsSpreadsheet;
const updateProspectionsSpreadsheet = async (spreadSheetStrategy, spreadSheetId, prospections) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const prospectionCells = (0, spreadsheets_prospection_utils_1.getProspectionsCellsUpdates)(spreadSheet, prospections);
    spreadSheet = await spreadSheetStrategy.updateCells(spreadSheet, prospectionCells);
    return spreadSheet;
};
exports.updateProspectionsSpreadsheet = updateProspectionsSpreadsheet;
const updateSellersSpreadsheet = async (spreadSheetStrategy, spreadSheetId, sellers) => {
    let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
    const sellersUpdates = (0, spreadsheets_prospection_utils_1.getSellersCellsUpdates)(spreadSheet, sellers);
    spreadSheet = await spreadSheetStrategy.updateCells(spreadSheet, sellersUpdates);
    return spreadSheet;
};
exports.updateSellersSpreadsheet = updateSellersSpreadsheet;
const removeProspectionsSpreadsheet = async (spreadSheetStrategy, spreadSheetId, prospections) => {
    if (prospections.length === 0)
        return null;
    try {
        let spreadSheet = await spreadSheetStrategy.getSpreadSheet(spreadSheetId);
        console.log('spreadSheet', spreadSheet);
        const prospectionsToRemove = (0, spreadsheets_prospection_utils_1.getProspectionsToRemove)(spreadSheet, prospections);
        console.log('prospectionsToRemove', prospectionsToRemove);
        if (prospectionsToRemove.length) {
            const rowIdentifiers = prospectionsToRemove.map(prospection => ({ lien: prospection.link }));
            console.log('spreadSheetId', spreadSheet?.id);
            console.log('rowIdentifiers', rowIdentifiers);
            console.log('sheetTitle', spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0]);
            spreadSheet = await spreadSheetStrategy.removeRowsInSheet(spreadSheet.id, spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[0], rowIdentifiers);
            const prospectionCells = (0, spreadsheets_prospection_utils_1.formatProspections)(prospectionsToRemove, []).map(prospection => (0, spreadsheets_prospection_utils_1.convertProspectionToCells)(prospection));
            return await spreadSheetStrategy.addRowsInSheets(spreadSheet.id, [
                { sheetTitle: spreadsheets_prospection_utils_1.PROSPECTIONS_SHEETS_TITLES[2], missingRows: prospectionCells },
            ]);
        }
        else {
            return spreadSheet;
        }
    }
    catch (e) {
        console.error('Error removeProspectionsSpreadsheet', e);
        return null;
    }
};
exports.removeProspectionsSpreadsheet = removeProspectionsSpreadsheet;
//# sourceMappingURL=spreadsheets.prospection.business.js.map