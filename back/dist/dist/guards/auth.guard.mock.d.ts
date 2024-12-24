import { CanActivate, ExecutionContext } from '@nestjs/common';
import { User_Db } from '../user/user-db.model';
export declare class MockJwtAuthGuard implements CanActivate {
    private mockUser;
    constructor(mockUser: User_Db);
    canActivate(context: ExecutionContext): boolean;
}
