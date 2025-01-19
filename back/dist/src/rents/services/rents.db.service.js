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
exports.RentsDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const rents_entity_1 = require("../rents.entity");
let RentsDbService = class RentsDbService {
    constructor(rentsRepository) {
        this.rentsRepository = rentsRepository;
    }
    create(rentDto) {
        const rent = this.rentsRepository.create(rentDto);
        return (0, rxjs_1.from)(this.rentsRepository.upsert(rent, {
            conflictPaths: ['user_id', 'estate_id', 'lodger_id', 'start_date', 'end_date'],
        }).then(() => rent));
    }
    getByEstate(estateId) {
        return (0, rxjs_1.from)(this.rentsRepository.find({ where: { estate_id: estateId } }));
    }
    getByUserId(userId) {
        return (0, rxjs_1.from)(this.rentsRepository.find({ where: { user_id: userId } })).pipe((0, rxjs_1.map)(rents => {
            return rents.map(rent => {
                return {
                    ...rent,
                    totalRent: rent.rent + rent.charges,
                    start_date: new Date(rent.start_date),
                    end_date: new Date(rent.end_date),
                };
            });
        }));
    }
    update(rent) {
        return (0, rxjs_1.from)(this.rentsRepository.update(rent.id, rent));
    }
    delete(id) {
        return (0, rxjs_1.from)(this.rentsRepository.delete(id));
    }
};
exports.RentsDbService = RentsDbService;
exports.RentsDbService = RentsDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rents_entity_1.Rent_Entity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RentsDbService);
//# sourceMappingURL=rents.db.service.js.map