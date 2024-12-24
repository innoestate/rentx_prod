import { Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Estate } from './estate.entity';
import { Estate_Db } from './estate-db.model';
export declare class EstatesService {
    private estateRepository;
    constructor(estateRepository: Repository<Estate>);
    create(estateDb: Estate_Db): Observable<Estate>;
    update(estateDto: DeepPartial<Estate>): Observable<any>;
    delete(id: string): Observable<any>;
    getById(id: string): Observable<any>;
    getByUser(userId: string): Promise<Estate_Db[] | undefined>;
}
