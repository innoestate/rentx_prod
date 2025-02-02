import { User_Db } from 'src/user/user-db.model';
export declare const dropAllTables: () => Promise<void>;
export declare const emptyingTable: (tableName: string) => Promise<void>;
export declare const createUser: (user: {
    email: string;
    name: string;
}) => Promise<User_Db>;
