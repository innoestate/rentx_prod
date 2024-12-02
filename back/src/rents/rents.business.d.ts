import { Estate_Db } from '../estates/estate-db.model';
import { Lodger_Db } from '../lodgers/lodger-db.model';
import { Owner_Db } from '../owners/owners-db.model';
export declare const createRentReciptPdf: (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db, startDate_?: string, endDate_?: string) => Promise<unknown>;
export declare const createRentReceiptEmail: (owners: Owner_Db[], lodgers: Lodger_Db[], estate: Estate_Db, startDate_?: string, endDate_?: string) => import("rxjs").Observable<string>;
export declare const calculateRent: (rent: number, charges: number, dateStart: Date, dateEnd?: Date) => number;
