"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const estates_service_1 = require("../estates/estates.service");
const lodgers_service_1 = require("../lodgers/lodgers.service");
const owners_service_1 = require("../owners/owners.service");
const rents_db_service_1 = require("../rents/rents.db.service");
const estates_tests_1 = require("./estates-tests");
const lodgers_tests_1 = require("./lodgers-tests");
const owners_tests_1 = require("./owners-tests");
const rents_tests_1 = require("./rents-tests");
const user_tests_1 = require("./user-tests");
const db_utils_1 = require("./utils/db.utils");
const user_utils_1 = require("./utils/user.utils");
describe('/api', () => {
    let app;
    let user;
    let ownerService;
    let lodgerService;
    let estateService;
    let rentsDbService;
    let rentsService;
    beforeAll(async () => {
        await (0, db_utils_1.dropAllTables)();
        user = await (0, user_utils_1.buildUser)('elon.musk@spacex.io');
        app = await (0, user_utils_1.buildApp)(user);
        ownerService = app.get(owners_service_1.OwnersService);
        lodgerService = app.get(lodgers_service_1.LodgersService);
        estateService = app.get(estates_service_1.EstatesService);
        rentsDbService = app.get(rents_db_service_1.RentsDbService);
    });
    afterAll(async () => {
        await app.close();
    });
    (0, estates_tests_1.estateTests)(() => app, () => user, () => estateService);
    (0, user_tests_1.userTests)(() => app, () => user);
    (0, owners_tests_1.ownersTests)(() => app);
    (0, lodgers_tests_1.lodgersTests)(() => app);
    (0, rents_tests_1.rentsTests)(() => app, () => rentsDbService);
});
//# sourceMappingURL=user.end-to-end.spec.js.map