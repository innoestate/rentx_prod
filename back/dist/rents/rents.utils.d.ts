import { Estate_filled_Db } from "src/estates/estate-filled-db.model";
import { Rent_Db } from "./models/rents.db.model";
import { MonthlyRents } from "./models/monlthy-rent.model";
export declare const getRentsByMonth: (fusionnedRents: Rent_Db[], rentsFromDb?: Rent_Db[]) => MonthlyRents[];
export declare const fusionateRents: (rents: Rent_Db[], estatesScope?: Estate_filled_Db[]) => Rent_Db[];
export declare const fusionRent: (rent: Rent_Db, rentsToMerge: Rent_Db[]) => Rent_Db[];
export declare const isOneDayDifference: (date1: Date, date2: Date) => boolean;
export declare const getStartAndEnDatesFromRents: (rents: Rent_Db[]) => {
    startDate: Date;
    endDate: Date;
};
export declare const calculateRent: (rent: number, charges: number, dateStart: Date, dateEnd?: Date) => number;
export declare const calculateMonthlyRent: (rent: number, charges: number, dateStart: Date, dateEnd?: Date) => {
    year: number;
    month: number;
    rent: number;
}[];
