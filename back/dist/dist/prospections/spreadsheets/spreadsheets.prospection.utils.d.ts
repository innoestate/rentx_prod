import { SellerDb } from "../../sellers/models/seller.db";
import { Cell, SpreadSheet, SpreadSheetUpdate } from "../../spreadsheets/models/spreadsheets.model";
import { ProspectionBuilded } from "../dto/prospection.builded";
import { ProspectionDb } from "../dto/prospection.db";
export declare const PROSPECTIONS_SPREADSHEETS_TITLE = "Prospections immobilier";
export declare const PROSPECTIONS_SHEETS_TITLES: string[];
export declare const PROSPECTIONS_SHEETS_HEADERS: {
    Prospections: string[];
    Vendeurs: string[];
    Archives: string[];
};
export declare const HEADER_BACKGROUND_COLOR: {
    red: number;
    green: number;
    blue: number;
};
export declare const getProspectionsCellsUpdates: (spreadSheet: SpreadSheet, prospections: ProspectionBuilded[]) => SpreadSheetUpdate[];
export declare const getSellersCellsUpdates: (spreadSheet: SpreadSheet, sellers: SellerDb[]) => SpreadSheetUpdate[];
export declare const getProspectionsToRemove: (spreadSheet: SpreadSheet, prospections: ProspectionDb[]) => ProspectionDb[];
export declare const getProspectionsInRowsThatAreNotInProspections: (spreadSheet: SpreadSheet, prospections: ProspectionDb[]) => ProspectionBuilded[];
export declare const getMissingProspections: (spreadSheet: SpreadSheet, prospections: ProspectionDb[]) => ProspectionDb[];
export declare const getMissingSellers: (spreadSheet: SpreadSheet, sellers: SellerDb[]) => SellerDb[];
export declare const convertProspectionToCells: (prospection: ProspectionBuilded) => Cell[];
export declare const convertCellsToSuperficialProspection: (cells: Cell[]) => ProspectionBuilded;
export declare const convertSellerToCells: (seller: SellerDb) => Cell[];
export declare const formatProspections: (prospections: ProspectionDb[], sellers: SellerDb[]) => ProspectionBuilded[];
export declare const getHeader: (sheetTitle: string) => any;
