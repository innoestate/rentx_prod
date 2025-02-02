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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMidleweare = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const user_service_1 = require("../user/user.service");
let UserMidleweare = class UserMidleweare {
    constructor(usersService) {
        this.usersService = usersService;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        if (req.user.id) {
            return this.usersService.findById(req.user.id).pipe((0, rxjs_1.map)(user => ({ ...user, ...req.user })), (0, rxjs_1.tap)(user => {
                if (req.user.refresh_token && req.user.refresh_token !== user.refresh_token) {
                    this.usersService.updateGoogleRefreshToken(req.user.id, req.user.refresh_token).pipe((0, rxjs_1.take)(1)).subscribe();
                }
            }), (0, rxjs_1.tap)(user => req.user = user), (0, rxjs_1.map)(() => req));
        }
        else if (req.user.email) {
            const user = this.formatGoogleUser(req.user);
            return this.usersService.create(req.user.email, user).pipe((0, rxjs_1.map)(user => ({ ...user, ...req.user, firstRegistration: true })), (0, rxjs_1.tap)(user => req.user = user), (0, rxjs_1.map)(() => req));
        }
        return false;
    }
    formatGoogleUser(user) {
        let name = '';
        if (user.firstName && user.lastName) {
            name = user.firstName + ' ' + user.lastName;
        }
        return { ...user, name };
    }
};
exports.UserMidleweare = UserMidleweare;
exports.UserMidleweare = UserMidleweare = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UserMidleweare);
//# sourceMappingURL=user-midleweare.guard.js.map