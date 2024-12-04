import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Owner_Entity } from '../owners/owners.entity';
export declare class UsersService {
    private usersRepository;
    private ownerRepository;
    constructor(usersRepository: Repository<User>, ownerRepository: Repository<Owner_Entity>);
    create(email: string, data: any): Observable<User>;
    updateGoogleRefreshToken(id: string, refresh_token: string): Observable<User>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Observable<User>;
}
