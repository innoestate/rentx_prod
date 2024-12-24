import { Estate_Dto } from '../estates/estate-dto.model';
import { Owner_Dto } from './owners-dto.model';
import { OwnersService } from './owners.service';
export declare class OwnerController {
    private ownerService;
    constructor(ownerService: OwnersService);
    getOwners(req: any): import("rxjs").Observable<any>;
    postOwner(req: any, ownerDto: Owner_Dto): import("rxjs").Observable<any>;
    patchOwners(req: any, ownerDto: Partial<Estate_Dto>): import("rxjs").Observable<any>;
    deleteOwner(req: any, ownerDto: {
        id: string;
    }): import("rxjs").Observable<any>;
}
