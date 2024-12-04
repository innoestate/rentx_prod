import { Estate } from "../estates/estate.entity";
import { Lodger_Entity } from "../lodgers/lodger.entity";
import { User } from "../user/user.entity";
export declare const config: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: (typeof User | typeof Estate | typeof Lodger_Entity)[];
    migrations: string[];
    synchronize: boolean;
    drpopSchema: boolean;
};
