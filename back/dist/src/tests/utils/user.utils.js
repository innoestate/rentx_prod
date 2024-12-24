"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = exports.buildUser = void 0;
const testing_1 = require("@nestjs/testing");
const app_module_1 = require("../../app.module");
const user_service_1 = require("../../user/user.service");
const auth_guard_mock_1 = require("../../guards/auth.guard.mock");
const auth_guard_1 = require("../../auth/auth.guard");
const buildUser = async (email, name = 'John Doe') => {
    const builderAppRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    }).compile();
    const userService = builderAppRef.get(user_service_1.UsersService);
    const user = await userService.create(email, { name }).toPromise();
    return user;
};
exports.buildUser = buildUser;
const buildApp = async (user) => {
    const moduleRef = await testing_1.Test.createTestingModule({
        imports: [app_module_1.AppModule],
    })
        .overrideGuard(auth_guard_1.JwtAuthGuard)
        .useValue(new auth_guard_mock_1.MockJwtAuthGuard(user))
        .compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    return app;
};
exports.buildApp = buildApp;
//# sourceMappingURL=user.utils.js.map