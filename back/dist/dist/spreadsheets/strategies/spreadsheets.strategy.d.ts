import { Cell, Sheet, SpreadSheet, SpreadSheetUpdate } from "../models/spreadsheets.model";
export declare class SpreadSheetStrategy {
    getSpreadSheet(id: string): Promise<SpreadSheet>;
    createSpreadSheet(title: string): Promise<SpreadSheet>;
    addSheet(id: string, title: string, heder: Cell[], rows: Cell[][]): Promise<SpreadSheet>;
    addSheets(id: string, sheets: {
        title: string;
        header: Cell[];
        rows: Cell[][];
    }[]): Promise<SpreadSheet>;
    addRowsInSheets(id: string, missings: {
        sheetTitle: string;
        missingRows: Cell[][];
    }[]): Promise<SpreadSheet>;
    removeRowsInSheet(id: string, sheetTitle: string, rowIdentifier: {
        [key: string]: string | number;
    }[]): Promise<SpreadSheet>;
    removeRowsInSheets(id: string, rowIdentifier: {
        [key: string]: string | number;
    }[]): Promise<SpreadSheet>;
    getSheets(id: string): Promise<Sheet[]>;
    updateCells(spreadSheet: SpreadSheet, cellUpdates: SpreadSheetUpdate[]): Promise<SpreadSheet>;
}
