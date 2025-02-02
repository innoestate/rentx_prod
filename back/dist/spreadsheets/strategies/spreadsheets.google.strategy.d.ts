import { sheets_v4 } from 'googleapis';
import { Cell, Sheet, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";
export declare const MONTHS: string[];
export declare const getOath2Client: (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => Promise<import("google-auth-library").OAuth2Client>;
export declare class SpreadSheetGoogleStrategy extends SpreadSheetStrategy {
    oauth2Client: any;
    sheets: sheets_v4.Sheets;
    constructor();
    init(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<boolean>;
    getSpreadSheet(id: string): Promise<SpreadSheet>;
    createSpreadSheet(title: string): Promise<SpreadSheet>;
    addSheet(id: string, title: string, header: Cell[], rows: Cell[][]): Promise<SpreadSheet>;
    addSheets(id: string, sheets: {
        title: string;
        header: Cell[];
        rows: Cell[][];
    }[]): Promise<SpreadSheet>;
    addRowsInSheets(id: string, missings: {
        sheetTitle: string;
        missingRows: Cell[][];
    }[]): Promise<SpreadSheet>;
    removeRowsInSheets(id: string, rowIdentifiers: {
        [key: string]: string | number;
    }[]): Promise<SpreadSheet>;
    getSheets(id: string): Promise<Sheet[]>;
    updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet>;
    private convertCellToSchemaCellData;
}
