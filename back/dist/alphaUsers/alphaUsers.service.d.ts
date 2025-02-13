import { Repository } from 'typeorm';
import { AlphaUser } from './alphaUser.entity';
export declare class AlphaUsersService {
    private readonly alphaUserRepository;
    constructor(alphaUserRepository: Repository<AlphaUser>);
    addUser(email: string): Promise<AlphaUser>;
}
