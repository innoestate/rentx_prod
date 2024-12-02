import { Estate_Dto } from './estate-dto.model';
import { EstatesService } from './estates.service';
export declare class EstatesController {
    private estateService;
    constructor(estateService: EstatesService);
    getEstates(req: any): Promise<import("./estate.entity").Estate[]>;
    postEstates(req: any, estateDto: Estate_Dto): import("rxjs").Observable<any>;
    patchEstates(req: any, estateDto: Partial<Estate_Dto>): import("rxjs").Observable<any>;
    deleteEstates(req: any, estateDto: Partial<Estate_Dto>): import("rxjs").Observable<any>;
}
