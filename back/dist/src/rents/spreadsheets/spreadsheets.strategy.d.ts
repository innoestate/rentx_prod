import { Estate_filled_Db } from "../../estates/estate-filled-db.model";
import { Sheet, SpreadSheet } from "./rents.spreadsheets.business";
export declare class SpreadSheetStrategy {
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
        city: string | number;
        plot?: string;
    }[]): Promise<SpreadSheet>;
    getSheets(id: string): Promise<Sheet[]>;
}
