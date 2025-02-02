import { Estate_filled_Db } from "../../estates/estate-filled-db.model";
import { SpreadSheetStrategy } from "../../spreadsheets/strategies/spreadsheets.strategy";
import { SpreadSheet } from "../../spreadsheets/models/spreadsheets.model";
import { Rent_Db } from "../models/rents.db.model";
export declare const buildSpreadsheetContext: (sheetStrategy: SpreadSheetStrategy, id: string, estates: Estate_filled_Db[], startDate: Date, endDate: Date) => Promise<{
    spreadSheet: SpreadSheet;
    hasBeenRemoved: boolean;
}>;
export declare const fillSpreadSheetCells: (sheetStrategy: SpreadSheetStrategy, spreadSheet: SpreadSheet, rents: Rent_Db[], estates: Estate_filled_Db[]) => Promise<SpreadSheet>;
