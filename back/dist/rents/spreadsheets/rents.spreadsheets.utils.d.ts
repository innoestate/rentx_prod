import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Cell, Sheet, SpreadSheet, SpreadSheetUpdate } from "../../spreadsheets/models/spreadsheets.model";
import { Rent_Db } from "../models/rents.db.model";
export declare const MONTHS: string[];
export declare const EstatesSheetsHeader: {
    value: string;
    backgroundColor: {
        red: number;
        blue: number;
        green: number;
    };
}[];
export declare const convertEstatesToSheetRows: (estates: Estate_filled_Db[]) => Cell[][];
export declare const getPaidUpdatesRentsCells: (spreadSheetContext: SpreadSheet, rents: Rent_Db[], estates: Estate_filled_Db[]) => SpreadSheetUpdate[];
export declare const getMissingRows: (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]) => {
    sheetTitle: string;
    missingRows: Cell[][];
}[];
export declare const getUnusedEstates: (spreadSheet: SpreadSheet, estates: Estate_filled_Db[]) => {
    street: string | number;
    city: string | number;
    plot?: string;
}[];
export declare const rowNotExistInEstates: (row: {
    street: any;
    city: any;
    plot: any;
}, estates: Estate_filled_Db[]) => boolean;
export declare const getYearsFromDates: (startDate: Date, endDate: Date) => string[];
export declare const getMissingSheetsTitles: (sheets: Sheet[], years: string[]) => string[];
export declare const estateIsSameThatRow: (estate: Estate_filled_Db | {
    street: any;
    city: any;
    plot: any;
}, street: any, city: any, plot: any) => boolean;
