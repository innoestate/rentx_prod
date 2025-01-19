import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Docs_Db } from '../../docs/docs.db.model';
import { DocsDbService } from '../../docs/docs.db.service';
import { EstatesService } from '../../estates/estates.service';
import { LodgersService } from '../../lodgers/lodgers.service';
import { OwnersService } from '../../owners/owners.service';
import { MonthlyRents } from '../models/monlthy-rent.model';
import { RentsDbService } from './rents.db.service';
export declare class RentsService {
    private config;
    private rentsDbService;
    private docsDbService;
    private estateService;
    private ownerService;
    private lodgerService;
    constructor(config: ConfigService, rentsDbService: RentsDbService, docsDbService: DocsDbService, estateService: EstatesService, ownerService: OwnersService, lodgerService: LodgersService);
    buildRentReciptPdf(userId: string, estate: any, owner: any, lodger: any, startDate_: string, endDate_: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<any>;
    SendRentReceiptByEmail(userId: string, estateId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string, startDate_?: string, endDate_?: string): Observable<string>;
    synchronizeRentsInGoogleSheet(userId: string, accessToken: string, refreshToken: string, clientId: string, clientSecret: string): Observable<Docs_Db>;
    getMonthlyRents(userId: string): Observable<MonthlyRents[]>;
    private getSpreadSheetId;
    private saveSpreadSheetId;
    private getFullEstates;
}
