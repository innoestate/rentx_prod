import { Estate_Db } from '../../estates/estate-db.model';
import { Lodger_Db } from '../../lodgers/lodger-db.model';
import { Owner_Db } from '../../owners/owners-db.model';
import { Estate_filled_Db } from 'src/estates/estate-filled-db.model';
export declare const createRentReciptPdf: (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db, startDate_?: string, endDate_?: string) => Promise<unknown>;
export declare const getRentReceiptInfos: (estate: Estate_Db, owner: Owner_Db, lodger: Lodger_Db, startDate_?: string, endDate_?: string) => {
    startDate: Date;
    endDate: Date;
    rent: number;
    charges: number;
    totalRent: number;
    rentsByMonths: {
        year: number;
        month: number;
        rent: number;
    }[];
    street: string;
    lodgerZipAndCity: string;
    ownerZipAndCity: string;
    madeAt: string;
    signature: string;
};
export declare const createRentReceiptEmail: (estate: Estate_filled_Db, startDate: Date, endDate: Date) => import("rxjs").Observable<string>;
