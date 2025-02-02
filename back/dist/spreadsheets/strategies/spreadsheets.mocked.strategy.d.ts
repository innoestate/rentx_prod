import { Sheet, Cell, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";
import { SpreadSheetStrategy } from "./spreadsheets.strategy";
export declare class MockedGoogleSpreadSheetStrategy extends SpreadSheetStrategy {
    fakeSpreadSheets: {
        [id: string]: SpreadSheet;
    };
    constructor();
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
    removeRowsInSheet(id: string, sheetTitle: string, rowIdentifiers: {
        [key: string]: string | number;
    }[]): Promise<SpreadSheet>;
    removeRowsInSheets(id: string, rowIdentifiers: {
        [key: string]: string | number;
    }[]): Promise<SpreadSheet>;
    getSheets(id: string): Promise<Sheet[]>;
    updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet>;
}
