"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const estate_entity_1 = require("../estates/estate.entity");
const lodger_entity_1 = require("../lodgers/lodger.entity");
const owners_entity_1 = require("../owners/owners.entity");
const user_entity_1 = require("../user/user.entity");
exports.config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_entity_1.User, owners_entity_1.Owner_Entity, lodger_entity_1.Lodger_Entity, estate_entity_1.Estate],
    migrations: ['**/migrations/*.js'],
    synchronize: process.env.NODE_ENV === 'test',
    drpopSchema: process.env.NODE_ENV === 'test',
};
//# sourceMappingURL=typeorm.config.js.map