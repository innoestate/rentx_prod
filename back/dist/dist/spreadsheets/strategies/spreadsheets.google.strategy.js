"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadSheetGoogleStrategy = exports.getOath2Client = exports.MONTHS = void 0;
const googleapis_1 = require("googleapis");
const spreadsheets_strategy_1 = require("./spreadsheets.strategy");
exports.MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const getOath2Client = async (accessToken, refreshToken, clientId, clientSecret) => {
    const oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    await refreshTokenFunction(oauth2Client);
    return oauth2Client;
};
exports.getOath2Client = getOath2Client;
const refreshTokenFunction = async (oauth2Client) => {
    console.log('refresh token');
    await oauth2Client.refreshAccessToken().then(tokens => {
        oauth2Client.setCredentials(tokens.credentials);
        return tokens.credentials.access_token;
    });
};
class SpreadSheetGoogleStrategy extends spreadsheets_strategy_1.SpreadSheetStrategy {
    constructor() {
        super();
    }
    async init(ccessToken, refreshToken, clientId, clientSecret) {
        this.oauth2Client = await (0, exports.getOath2Client)(ccessToken, refreshToken, clientId, clientSecret);
        this.sheets = await googleapis_1.google.sheets('v4');
        return true;
    }
    async getSpreadSheet(id) {
        try {
            const response = await this.sheets.spreadsheets.get({
                spreadsheetId: id,
                auth: this.oauth2Client,
                includeGridData: true
            });
            const ranges = await response.data.sheets;
            return {
                id: response.data.spreadsheetId,
                title: response.data.properties.title,
                sheets: ranges.map(range => {
                    let rows = [];
                    for (let data of range?.data) {
                        for (let row of data.rowData) {
                            rows.push(row.values.map(value => ({ value: value.formattedValue })));
                        }
                    }
                    return {
                        sheetId: range.properties.sheetId,
                        title: range.properties.title,
                        rows
                    };
                }),
            };
        }
        catch (error) {
            console.log('Error getSpreadSheet', id);
        }
        return null;
    }
    async createSpreadSheet(title) {
        try {
            const sheets = googleapis_1.google.sheets('v4');
            const request = {
                resource: {
                    properties: {
                        title,
                    },
                },
                auth: this.oauth2Client,
            };
            const response = await sheets.spreadsheets.create(request);
            return {
                id: response.data.spreadsheetId,
                title,
                sheets: [],
            };
        }
        catch (error) {
            console.error('Error creating the Google Sheet:', error);
        }
        return null;
    }
    async addSheet(id, title, header, rows) {
        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
            includeGridData: true
        });
        const ranges = await response.data.sheets;
        let sheetId = ranges.map(range => range.properties.sheetId).reduce((acc, cur) => Math.max(acc, cur), 0) + 1;
        if (ranges.length === 1 && !ranges[0].data[0].rowData) {
            sheetId = 0;
        }
        let sheetProperty = {};
        if (sheetId === 0) {
            sheetProperty = {
                updateSheetProperties: {
                    properties: {
                        sheetId: sheetId,
                        title,
                    },
                    fields: 'title',
                }
            };
        }
        else {
            sheetProperty = {
                addSheet: {
                    properties: {
                        sheetId: sheetId,
                        title,
                    },
                }
            };
        }
        const requests = [
            sheetProperty,
            {
                updateCells: {
                    rows: [
                        {
                            values: header.map(cell => this.convertCellToSchemaCellData(cell)),
                        },
                    ],
                    fields: '*',
                    start: { sheetId, rowIndex: 0, columnIndex: 0 },
                },
            },
            {
                appendCells: {
                    rows: [
                        ...rows.map(cells => ({
                            values: [...cells.map(cell => this.convertCellToSchemaCellData(cell))],
                        })),
                    ],
                    fields: '*',
                    sheetId,
                },
            },
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: sheetId,
                        gridProperties: {
                            frozenRowCount: 1,
                        },
                    },
                    fields: 'gridProperties.frozenRowCount',
                },
            },
            {
                updateDimensionProperties: {
                    range: {
                        sheetId: sheetId,
                        dimension: 'COLUMNS',
                        startIndex: 1,
                        endIndex: 2,
                    },
                    properties: {
                        pixelSize: 300,
                    },
                    fields: 'pixelSize',
                },
            }
        ];
        await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: id,
            requestBody: {
                requests,
            },
            auth: this.oauth2Client,
        });
        return await this.getSpreadSheet(id);
    }
    async addSheets(id, sheets) {
        while (sheets.length) {
            const sheet = sheets.pop();
            await this.addSheet(id, sheet.title, sheet.header, sheet.rows);
        }
        return await this.getSpreadSheet(id);
    }
    async addRowsInSheets(id, missings) {
        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
        });
        const ranges = await response.data.sheets;
        let i = 0;
        while (i < missings.length) {
            const { sheetTitle, missingRows } = missings[i];
            i++;
            const sheetId = ranges.find(sheet => sheet.properties.title.toString() === sheetTitle.toString())?.properties.sheetId;
            if (sheetId === undefined || null)
                throw new Error('Sheet not found');
            const requests = [
                {
                    appendCells: {
                        rows: [
                            ...missingRows.map(cells => ({
                                values: cells.map(cell => this.convertCellToSchemaCellData(cell)),
                            })),
                        ],
                        fields: '*',
                        sheetId,
                    },
                }
            ];
            await this.sheets.spreadsheets.batchUpdate({
                spreadsheetId: id,
                requestBody: {
                    requests,
                },
                auth: this.oauth2Client,
            });
        }
        ;
        return await this.getSpreadSheet(id);
    }
    async removeRowsInSheets(id, rowIdentifiers) {
        const response = await this.sheets.spreadsheets.get({
            spreadsheetId: id,
            auth: this.oauth2Client,
            includeGridData: true
        });
        const ranges = await response.data.sheets;
        let i = 0;
        while (i < ranges.length) {
            const range = ranges[i];
            i++;
            const sheetId = range.properties.sheetId;
            const headers = range?.data[0].rowData[0].values.map(value => value.effectiveValue.stringValue);
            const rows = range?.data[0].rowData.map(rs => rs.values.map(value => value?.effectiveValue?.stringValue)) ?? [];
            const matchingIndexes = [];
            rowIdentifiers.forEach(identifier => {
                const indexes = {};
                Object.keys(identifier).forEach(key => {
                    indexes[key] = headers.findIndex(h => h === key);
                });
                rows.forEach((row, i2) => {
                    let matchingCells = 0;
                    Object.keys(indexes).forEach(key => {
                        if (row[indexes[key]] === identifier[key]) {
                            matchingCells++;
                        }
                    });
                });
            });
            const requests = matchingIndexes.reduce((acc, rowIndex) => ([
                ...acc,
                {
                    deleteDimension: {
                        range: {
                            sheetId: sheetId,
                            dimension: 'ROWS',
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                },
            ]), []);
            if (requests.length > 0) {
                await this.sheets.spreadsheets.batchUpdate({
                    spreadsheetId: id,
                    requestBody: {
                        requests,
                    },
                    auth: this.oauth2Client,
                });
            }
        }
        return null;
    }
    async getSheets(id) {
        const spreadsheet = await this.getSpreadSheet(id);
        return spreadsheet.sheets;
    }
    async updateCells(spreadSheet, cellUpdates) {
        const requests = [];
        cellUpdates.forEach(cellUpdate => {
            function extractNumberFromString(str) {
                const match = str.match(/\d+/);
                return match ? parseInt(match[0], 10) : -1;
            }
            const sheetId = spreadSheet.sheets.find(sheet => sheet.title === cellUpdate.sheetTitle).sheetId;
            const rowIndex = extractNumberFromString(cellUpdate.cell) - 1;
            const columnIndex = cellUpdate.cell.charCodeAt(0) - 'A'.charCodeAt(0);
            const update = {
                updateCells: {
                    range: {
                        sheetId,
                        startRowIndex: rowIndex,
                        endRowIndex: rowIndex + 1,
                        startColumnIndex: columnIndex,
                        endColumnIndex: columnIndex + 1,
                    },
                    rows: [
                        {
                            values: [{
                                    userEnteredValue: { stringValue: cellUpdate.value.toString() },
                                    userEnteredFormat: {
                                        backgroundColor: cellUpdate?.backgroundColor ?? {
                                            red: 1,
                                            green: 1,
                                            blue: 1,
                                            alpha: 1
                                        }
                                    },
                                }],
                        },
                    ],
                    fields: '*',
                },
            };
            requests.push(update);
        });
        await this.sheets.spreadsheets.batchUpdate({
            spreadsheetId: spreadSheet.id,
            requestBody: {
                requests,
            },
            auth: this.oauth2Client,
        });
        return await this.getSpreadSheet(spreadSheet.id);
    }
    convertCellToSchemaCellData(cell) {
        return { userEnteredValue: { stringValue: cell.value.toString() }, userEnteredFormat: { backgroundColor: cell.backgroundColor ?? { red: 1, green: 1, blue: 1 } } };
    }
}
exports.SpreadSheetGoogleStrategy = SpreadSheetGoogleStrategy;
//# sourceMappingURL=spreadsheets.google.strategy.js.map