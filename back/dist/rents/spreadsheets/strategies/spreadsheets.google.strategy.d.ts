import { Estate_filled_Db } from "../../../estates/estate-filled-db.model";
import { Sheet, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";
import { SpreadSheetStrategy } from "../strategies/spreadsheets.strategy";
import { sheets_v4 } from 'googleapis';
export declare const MONTHS: string[];
export declare const getOath2Client: (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => Promise<import("google-auth-library").OAuth2Client>;
export declare class SpreadSheetGoogleStrategy extends SpreadSheetStrategy {
    oauth2Client: any;
    sheets: sheets_v4.Sheets;
    constructor();
    init(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<boolean>;
    getSpreadSheet(id: string): Promise<SpreadSheet>;
    createSpreadSheet(title: string): Promise<SpreadSheet>;
    addSheet(id: string, title: string, estates: Estate_filled_Db[]): Promise<SpreadSheet>;
    addSheets(id: string, titles: string[], estates: Estate_filled_Db[]): Promise<SpreadSheet>;
    addRowsInSheets(id: string, missings: {
        sheetTitle: string;
        missingEstates: Estate_filled_Db[];
    }[]): Promise<SpreadSheet>;
    removeRowsInSheets(id: string, rowIdentifier: {
        street: string | number;
        city?: string | number;
        plot?: string;
    }[]): Promise<SpreadSheet>;
    getSheets(id: string): Promise<Sheet[]>;
    updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet>;
}
