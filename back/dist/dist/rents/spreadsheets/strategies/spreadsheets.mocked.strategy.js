"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedGoogleSpreadSheetStrategy = void 0;
const spreadsheets_google_strategy_1 = require("./spreadsheets.google.strategy");
const spreadsheets_strategy_1 = require("./spreadsheets.strategy");
const ROW_HEADER_VALUES = ['Propriétaire', 'Adresse', 'Ville', 'Lot', 'Locataire', 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
class MockedGoogleSpreadSheetStrategy extends spreadsheets_strategy_1.SpreadSheetStrategy {
    constructor() {
        super();
        this.fakeSpreadSheets = {};
    }
    async getSpreadSheet(id) {
        return this.fakeSpreadSheets[id];
    }
    async createSpreadSheet(title) {
        this.fakeSpreadSheets['fakeId'] = {
            id: 'fakeId',
            title,
            sheets: []
        };
        return this.fakeSpreadSheets['fakeId'];
    }
    async addSheet(id, title, estates) {
        const newSheet = {
            sheetId: this.fakeSpreadSheets[id].sheets.length,
            title,
            rows: [
                ROW_HEADER_VALUES.map(value => ({ value })),
                ...estates.map(estate => [
                    { value: estate.owner.name },
                    { value: estate.street },
                    { value: estate.city },
                    { value: estate.plot },
                    { value: estate.lodger.name },
                    ...spreadsheets_google_strategy_1.MONTHS.map(month => ({ value: '', backgroundColor: '#FFFFFF' }))
                ])
            ]
        };
        this.fakeSpreadSheets[id].sheets.push(newSheet);
        return this.fakeSpreadSheets[id];
    }
    async addSheets(id, titles, estates) {
        titles.forEach(title => {
            this.addSheet(id, title, estates);
        });
        return this.fakeSpreadSheets[id];
    }
    async addRowsInSheets(id, missings) {
        missings.forEach(missing => {
            const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle)?.rows;
            if (rows) {
                rows.push(...missing.missingEstates.map(estate => [
                    { value: estate.owner.name },
                    { value: estate.street },
                    { value: estate.city },
                    { value: estate.plot },
                    { value: estate.lodger.name }
                ]));
            }
            this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle).rows = rows;
        });
        return this.fakeSpreadSheets[id];
    }
    async removeRowsInSheets(id, rowIdentifier) {
        rowIdentifier.forEach(identifier => {
            for (let i = 0; i < this.fakeSpreadSheets[id].sheets.length; i++) {
                this.fakeSpreadSheets[id].sheets[i].rows = this.fakeSpreadSheets[id].sheets[i].rows.filter(rows => {
                    if (rows[1].value === identifier.street && rows[2].value === identifier.city && rows[3].value === identifier.plot) {
                        return false;
                    }
                    return true;
                });
            }
        });
        return this.fakeSpreadSheets[id];
    }
    async getSheets(id) {
        return this.fakeSpreadSheets[id]?.sheets ?? [];
    }
    async updateCells(spreadSheet, cellUpdates) {
        cellUpdates.forEach(update => {
            function extractNumberFromString(str) {
                const match = str.match(/\d+/);
                return match ? parseInt(match[0], 10) : -1;
            }
            const rowIndex = extractNumberFromString(update.cell) - 1;
            const columnIndex = update.cell.charCodeAt(0) - 'A'.charCodeAt(0);
            spreadSheet.sheets.find(sheet => update.sheetTitle === sheet.title).rows[rowIndex][columnIndex].value = update.value;
            spreadSheet.sheets.find(sheet => update.sheetTitle === sheet.title).rows[rowIndex][columnIndex].backgroundColor = update.backgroundColor;
        });
        return spreadSheet;
    }
}
exports.MockedGoogleSpreadSheetStrategy = MockedGoogleSpreadSheetStrategy;
//# sourceMappingURL=spreadsheets.mocked.strategy.js.map