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
exports.EstatesController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_guard_1 = require("../auth/auth.guard");
const user_midleweare_guard_1 = require("../guards/user-midleweare.guard");
const error_typeorm_http_handler_1 = require("../utils/error-typeorm-http.handler");
const estate_utils_1 = require("./estate.utils");
const estates_service_1 = require("./estates.service");
let EstatesController = class EstatesController {
    constructor(estateService) {
        this.estateService = estateService;
    }
    getEstates(req) {
        return this.estateService.getByUser(req.user?.id);
    }
    postEstates(req, estateDto) {
        const estate_db = (0, estate_utils_1.formatEstateDtoToEstateDb)(estateDto, req.user?.id);
        return this.estateService.create(estate_db).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    patchEstates(req, estateDto) {
        const formatedEstate = (0, estate_utils_1.fromatEstateForPatch)(estateDto);
        return this.estateService.update(formatedEstate).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
    deleteEstates(req, estateDto) {
        return this.estateService.delete(estateDto.id).pipe((0, rxjs_1.catchError)(err => {
            (0, error_typeorm_http_handler_1.handleTypeormError)(err);
            return (0, rxjs_1.of)(err);
        }));
    }
};
exports.EstatesController = EstatesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Get)('estates'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EstatesController.prototype, "getEstates", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Post)('estates'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstatesController.prototype, "postEstates", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Patch)('estate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstatesController.prototype, "patchEstates", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, user_midleweare_guard_1.UserMidleweare),
    (0, common_1.Delete)('estates'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EstatesController.prototype, "deleteEstates", null);
exports.EstatesController = EstatesController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [estates_service_1.EstatesService])
], EstatesController);
//# sourceMappingURL=estates.controller.js.map