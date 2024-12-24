"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LodgersController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/auth.guard");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const lodgers_service_1 = require("./lodgers.service");
const error_typeorm_http_handler_1 = require("../utils/error-typeorm-http.handler");
const lodger_utils_model_1 = require("./lodger-utils.model");
let LodgersController = class LodgersController {
    constructor(lodgerService) {
        this.lodgerService = lodgerService;
    }
    getOwners(req) {
        return this.lodgerService.getByUser(req.user?.id).pipe((0, rxjs_1.catchError)(err => {
            console.error(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    postOwner(req, lodgerPost) {
        const formatedLodgerPost = (0, lodger_utils_model_1.formatLodgerPost)(lodgerPost, req.user.id);
        return this.lodgerService.create(formatedLodgerPost).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    patchOwners(req, lodgerPatch) {
        return this.lodgerService.update(lodgerPatch).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    deleteOwner(req, body) {
        return this.lodgerService.delete(body.id).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
};
exports.LodgersController = LodgersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('lodgers'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LodgersController.prototype, "getOwners", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)('lodgers'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LodgersController.prototype, "postOwner", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Patch)('lodgers'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LodgersController.prototype, "patchOwners", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Delete)('lodgers'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LodgersController.prototype, "deleteOwner", null);
exports.LodgersController = LodgersController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [lodgers_service_1.LodgersService])
], LodgersController);
//# sourceMappingURL=lodgers.controller.js.map