import { Lodger_Post } from './lodger-post.model';
import { LodgersService } from './lodgers.service';
import { LodgerPatch } from './lodger-patch.model';
export declare class LodgersController {
    private lodgerService;
    constructor(lodgerService: LodgersService);
    getOwners(req: any): import("rxjs").Observable<any>;
    postOwner(req: any, lodgerPost: Lodger_Post): import("rxjs").Observable<any>;
    patchOwners(req: any, lodgerPatch: Partial<LodgerPatch>): import("rxjs").Observable<any>;
    deleteOwner(req: any, body: {
        id: string;
    }): import("rxjs").Observable<any>;
}
