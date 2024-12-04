import { EstatesService } from '../estates/estates.service';
import { LodgersService } from '../lodgers/lodgers.service';
import { OwnersService } from '../owners/owners.service';
import { ConfigService } from '@nestjs/config';
export declare class RentsController {
    private estateService;
    private ownerService;
    private lodgerService;
    private configService;
    constructor(estateService: EstatesService, ownerService: OwnersService, lodgerService: LodgersService, configService: ConfigService);
    downloadPdfRentReceipt(req: any, res: any): import("rxjs").Observable<any>;
    downloadRentReceipt(req: any, res: any): import("rxjs").Observable<void>;
    sendRentReceipt(req: any, res: any): import("rxjs").Observable<any>;
}
