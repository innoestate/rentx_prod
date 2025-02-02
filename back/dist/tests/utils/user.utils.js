"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = void 0;
const testing_1 = require("@nestjs/testing");
const rxjs_1 = require("rxjs");
const app_module_1 = require("../../app.module");
const auth_guard_1 = require("../../auth/auth.guard");
const auth_guard_mock_1 = require("../../guards/auth.guard.mock");
const storage_service_1 = require("../../storage/services/storage.service");
const storage_mocked_service_1 = require("../../storage/tests/storage.mocked.service");
const user_service_1 = require("../../user/user.service");
const buildApp = async (user) => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule]
    })
        .overrideGuard(auth_guard_1.JwtAuthGuard)
        .useValue(new auth_guard_mock_1.MockJwtAuthGuard(user))
        .overrideProvider(storage_service_1.StorageService)
        .useClass(storage_mocked_service_1.StorageMockedService)
        .compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    await stakeUserInDb(app, user);
    return app;
};
exports.buildApp = buildApp;
const stakeUserInDb = async (app, user) => {
    const userService = app.get(user_service_1.UsersService);
    await (0, rxjs_1.lastValueFrom)(userService.create(user.email, { name: user.name }));
};
//# sourceMappingURL=user.utils.js.map