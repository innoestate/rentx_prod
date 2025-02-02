"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedGoogleSpreadSheetStrategy = void 0;
const spreadsheets_strategy_1 = require("./spreadsheets.strategy");
class MockedGoogleSpreadSheetStrategy extends spreadsheets_strategy_1.SpreadSheetStrategy {
    constructor() {
        super();
        this.fakeSpreadSheets = {};
    }
    async getSpreadSheet(id) {
        return this.fakeSpreadSheets[id];
    }
    async createSpreadSheet(title) {
        this.fakeSpreadSheets[title ?? 'fakeId'] = {
            id: title ?? 'fakeId',
            title,
            sheets: []
        };
        return this.fakeSpreadSheets[title ?? 'fakeId'];
    }
    async addSheet(id, title, header, rows) {
        const newSheet = {
            sheetId: this.fakeSpreadSheets[id].sheets.length,
            title,
            rows: [header, ...rows]
        };
        this.fakeSpreadSheets[id].sheets.push(newSheet);
        return this.fakeSpreadSheets[id];
    }
    async addSheets(id, sheets) {
        sheets.forEach(sheet => {
            this.addSheet(id, sheet.title, sheet.header, sheet.rows);
        });
        return this.fakeSpreadSheets[id];
    }
    async addRowsInSheets(id, missings) {
        missings.forEach(missing => {
            const rows = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle)?.rows;
            if (rows) {
                rows.push(...missing.missingRows);
                this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === missing.sheetTitle).rows = rows;
            }
        });
        return this.fakeSpreadSheets[id];
    }
    async removeRowsInSheet(id, sheetTitle, rowIdentifiers) {
        const sheet = this.fakeSpreadSheets[id].sheets.find(sheet => sheet.title === sheetTitle);
        if (!sheet)
            return this.fakeSpreadSheets[id];
        rowIdentifiers.forEach(rowIdentifier => {
            const indexes = {};
            Object.keys(rowIdentifier).forEach(key => {
                indexes[key] = sheet.rows[0].findIndex(cell => cell.value === key);
            });
            sheet.rows = sheet.rows.filter(rows => {
                let cellsIdentified = 0;
                Object.keys(indexes).forEach(key => {
                    if (rows[indexes[key]].value === rowIdentifier[key]) {
                        cellsIdentified++;
                    }
                });
                if (cellsIdentified === Object.keys(indexes).length) {
                    return false;
                }
                return true;
            });
        });
        return this.fakeSpreadSheets[id];
    }
    async removeRowsInSheets(id, rowIdentifiers) {
        if (rowIdentifiers.length === 0)
            return this.fakeSpreadSheets[id];
        rowIdentifiers.forEach(rowIdentifier => {
            for (let i = 0; i < this.fakeSpreadSheets[id].sheets.length; i++) {
                const indexes = {};
                Object.keys(rowIdentifier).forEach(key => {
                    indexes[key] = this.fakeSpreadSheets[id].sheets[i].rows[0].findIndex(cell => cell.value === key);
                });
                this.fakeSpreadSheets[id].sheets[i].rows = this.fakeSpreadSheets[id].sheets[i].rows.filter(rows => {
                    let cellsIdentified = 0;
                    Object.keys(indexes).forEach(key => {
                        if (rows[indexes[key]].value === rowIdentifier[key]) {
                            cellsIdentified++;
                        }
                    });
                    if (cellsIdentified === Object.keys(indexes).length) {
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