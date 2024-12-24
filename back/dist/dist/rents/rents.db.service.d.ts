import { Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Rent_Dto } from './rents.dto.model';
import { Rent_Entity } from './rents.entity';
import { Rent_Db } from './rents.db';
export declare class RentsDbService {
    private rentsRepository;
    constructor(rentsRepository: Repository<Rent_Entity>);
    create(rentDto: Rent_Dto): Observable<Rent_Entity>;
    getByEstate(estateId: string): Observable<Rent_Entity[]>;
    getByUserId(userId: string): Observable<Rent_Db[]>;
    update(rent: DeepPartial<Rent_Entity>): Observable<any>;
    delete(id: string): Observable<any>;
}
