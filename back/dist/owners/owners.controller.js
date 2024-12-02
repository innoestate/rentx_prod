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
exports.OwnerController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/auth.guard");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const error_typeorm_http_handler_1 = require("../utils/error-typeorm-http.handler");
const owners_service_1 = require("./owners.service");
const owners_utils_1 = require("./owners.utils");
let OwnerController = class OwnerController {
    constructor(ownerService) {
        this.ownerService = ownerService;
    }
    getOwners(req) {
        return this.ownerService.getByUser(req.user?.id).pipe((0, rxjs_1.catchError)(err => {
            console.error(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    postOwner(req, ownerDto) {
        const formatedOwner = (0, owners_utils_1.formatOwnerDtoToOwnerDb)(ownerDto, req.user?.id);
        return this.ownerService.create(formatedOwner).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    patchOwners(req, ownerDto) {
        return this.ownerService.update(ownerDto).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    deleteOwner(req, ownerDto) {
        return this.ownerService.delete(ownerDto.id).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
};
exports.OwnerController = OwnerController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('owners'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OwnerController.prototype, "getOwners", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)('owners'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OwnerController.prototype, "postOwner", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Patch)('owners'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OwnerController.prototype, "patchOwners", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Delete)('owners'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], OwnerController.prototype, "deleteOwner", null);
exports.OwnerController = OwnerController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [owners_service_1.OwnersService])
], OwnerController);
//# sourceMappingURL=owners.controller.js.map