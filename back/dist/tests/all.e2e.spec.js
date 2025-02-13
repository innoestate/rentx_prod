"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docs_db_service_1 = require("../docs/docs.db.service");
const estates_service_1 = require("../estates/estates.service");
const lodgers_service_1 = require("../lodgers/lodgers.service");
const owners_service_1 = require("../owners/owners.service");
const rents_db_service_1 = require("../rents/services/rents.db.service");
const storage_service_1 = require("../storage/services/storage.service");
const user_service_1 = require("../user/user.service");
const estates_tests_1 = require("./e2e/estates-tests");
const lodgers_tests_1 = require("./e2e/lodgers-tests");
const offers_test_1 = require("./e2e/offers-test");
const owners_tests_1 = require("./e2e/owners-tests");
const prospection_tests_1 = require("./e2e/prospection-tests");
const rents_tests_1 = require("./e2e/rents-tests");
const user_tests_1 = require("./e2e/user-tests");
const user_mock_1 = require("./mocks/user.mock");
const prospection_spreadsheets_tests_1 = require("./prospections/prospection.spreadsheets-tests");
const db_utils_1 = require("./utils/db.utils");
const user_utils_1 = require("./utils/user.utils");
const alpha_users_1 = require("./e2e/alpha-users");
describe('/api', () => {
    let app;
    let user;
    let userService;
    let ownerService;
    let lodgerService;
    let estateService;
    let rentsDbService;
    let storageService;
    let docsDbService;
    beforeAll(async () => {
        await (0, db_utils_1.dropAllTables)();
        app = await (0, user_utils_1.buildApp)(user_mock_1.userMock1);
        mapServices();
        user = await getUser();
    });
    afterAll(async () => {
        await app.close();
        await (0, db_utils_1.dropAllTables)();
    });
    (0, alpha_users_1.alphaUserTests)(() => app);
    (0, prospection_spreadsheets_tests_1.prospectionsSpreadsheetTests)(() => app, () => user, () => docsDbService);
    (0, estates_tests_1.estateTests)(() => app, () => user, () => estateService);
    (0, user_tests_1.userTests)(() => app, () => user);
    (0, owners_tests_1.ownersTests)(() => app);
    (0, lodgers_tests_1.lodgersTests)(() => app);
    (0, rents_tests_1.rentsTests)(() => app, () => rentsDbService);
    (0, prospection_tests_1.prospectionsTests)(() => app, () => storageService);
    (0, offers_test_1.offersTests)(() => app);
    const mapServices = () => {
        userService = app.get(user_service_1.UsersService);
        ownerService = app.get(owners_service_1.OwnersService);
        lodgerService = app.get(lodgers_service_1.LodgersService);
        estateService = app.get(estates_service_1.EstatesService);
        rentsDbService = app.get(rents_db_service_1.RentsDbService);
        storageService = app.get(storage_service_1.StorageService);
        docsDbService = app.get(docs_db_service_1.DocsDbService);
    };
    const getUser = async () => {
        return await userService.findByEmail(user_mock_1.userMock1.email);
    };
});
//# sourceMappingURL=all.e2e.spec.js.map