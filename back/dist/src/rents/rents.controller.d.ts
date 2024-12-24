import { ConfigService } from '@nestjs/config';
import { EstatesService } from '../estates/estates.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { RentsService } from './rents.service';
export declare class RentsController {
    private estateService;
    private ownerService;
    private lodgerService;
    private configService;
    private rentsService;
    constructor(estateService: EstatesService, ownerService: OwnersService, lodgerService: LodgersService, configService: ConfigService, rentsService: RentsService);
    downloadPdfRentReceipt(req: any, res: any): import("rxjs").Observable<any>;
    getRents(req: any, res: any): import("rxjs").Observable<void>;
    downloadRentReceipt(req: any, res: any): import("rxjs").Observable<void>;
    sendRentReceipt(req: any, res: any): import("rxjs").Observable<any>;
    synchronizeSheets(req: any, res: any): import("rxjs").Observable<void>;
}
