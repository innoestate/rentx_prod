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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const owners_entity_1 = require("../owners/owners.entity");
let UsersService = class UsersService {
    constructor(usersRepository, ownerRepository) {
        this.usersRepository = usersRepository;
        this.ownerRepository = ownerRepository;
    }
    create(email, data) {
        return (0, rxjs_1.from)(this.usersRepository.findOne({
            where: { email }
        })).pipe((0, rxjs_1.switchMap)(user => {
            if (!user) {
                const user = this.usersRepository.create({
                    email
                });
                return (0, rxjs_1.from)(this.usersRepository.save(user)).pipe((0, rxjs_1.switchMap)(createdUser => {
                    const owner = this.ownerRepository.create({
                        user_id: createdUser.id,
                        email,
                        name: data?.name ?? '',
                        street: data?.street ?? '',
                        city: data?.city ?? '',
                        zip: data?.zip ?? '',
                        signature: data?.signature ?? '',
                        phone: data?.phone ?? ''
                    });
                    return (0, rxjs_1.from)(this.ownerRepository.save(owner)).pipe((0, rxjs_1.map)(() => createdUser), (0, rxjs_1.catchError)(err => {
                        console.log('Error creating owner: ', err);
                        return (0, rxjs_1.of)(createdUser);
                    }));
                }));
            }
            else {
                return (0, rxjs_1.of)(user);
            }
        }));
    }
    updateGoogleRefreshToken(id, refresh_token) {
        return (0, rxjs_1.from)(this.usersRepository.update(id, { refresh_token })).pipe((0, rxjs_1.switchMap)(() => this.findById(id)));
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email']
        });
    }
    findById(id) {
        const user = this.usersRepository.findOne({
            where: { id },
            select: ['id', 'email']
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return (0, rxjs_1.from)(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(owners_entity_1.Owner_Entity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=user.service.js.map