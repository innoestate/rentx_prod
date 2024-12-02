import { Observable } from 'rxjs';
import { DeepPartial, Repository } from 'typeorm';
import { Owner_Dto } from './owners-dto.model';
import { Owner_Entity } from './owners.entity';
export declare class OwnersService {
    private ownerRepository;
    constructor(ownerRepository: Repository<Owner_Entity>);
    create(ownerDto: Owner_Dto): Observable<Owner_Entity>;
    update(ownerDto: DeepPartial<Owner_Entity>): Observable<any>;
    delete(id: string): Observable<any>;
    getByUser(userId: string): Observable<Owner_Entity[]>;
}
