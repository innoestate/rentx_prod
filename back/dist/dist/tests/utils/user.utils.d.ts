import { User_Db } from '../../user/user-db.model';
export declare const buildUser: (email: string, name?: string) => Promise<User_Db>;
export declare const buildApp: (user: any) => Promise<import("@nestjs/common").INestApplication<any>>;
