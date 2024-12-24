import { Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Lodger_Entity } from './lodger.entity';
import { Lodger_Post } from './lodger-post.model';
import { Lodger_Db } from './lodger-db.model';
export declare class LodgersService {
    private lodgerRepository;
    constructor(lodgerRepository: Repository<Lodger_Entity>);
    create(lodgerPost: Lodger_Post): Observable<Lodger_Entity>;
    getByUser(userId: string): Observable<Lodger_Db[]>;
    update(lodger: DeepPartial<Lodger_Entity>): Observable<any>;
    delete(id: string): Observable<any>;
}
