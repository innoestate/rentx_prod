import { Rent_Entity } from "../rents/rents.entity";
import { Estate } from "../estates/estate.entity";
import { Lodger_Entity } from "../lodgers/lodger.entity";
import { User } from "../user/user.entity";
import { Docs_Entity } from "../docs/docs.entity";
export declare const config: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: (typeof User | typeof Estate | typeof Lodger_Entity | typeof Docs_Entity | typeof Rent_Entity)[];
    migrations: string[];
    synchronize: boolean;
    drpopSchema: boolean;
};
