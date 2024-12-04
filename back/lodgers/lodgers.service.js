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
exports.LodgersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const lodger_entity_1 = require("./lodger.entity");
let LodgersService = class LodgersService {
    constructor(lodgerRepository) {
        this.lodgerRepository = lodgerRepository;
    }
    create(lodgerPost) {
        const lodger = this.lodgerRepository.create(lodgerPost);
        return (0, rxjs_1.from)(this.lodgerRepository.save(lodger));
    }
    getByUser(userId) {
        return (0, rxjs_1.from)(this.lodgerRepository.find({ where: { user_id: userId } }));
    }
    update(lodger) {
        return (0, rxjs_1.from)(this.lodgerRepository.update(lodger.id, lodger));
    }
    delete(id) {
        return (0, rxjs_1.from)(this.lodgerRepository.delete(id));
    }
};
exports.LodgersService = LodgersService;
exports.LodgersService = LodgersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(lodger_entity_1.Lodger_Entity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LodgersService);
//# sourceMappingURL=lodgers.service.js.map