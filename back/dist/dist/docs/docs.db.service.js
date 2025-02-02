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
exports.DocsDbService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rxjs_1 = require("rxjs");
const typeorm_2 = require("typeorm");
const docs_entity_1 = require("./docs.entity");
let DocsDbService = class DocsDbService {
    constructor(docsRepository) {
        this.docsRepository = docsRepository;
    }
    create(docsDto) {
        try {
            const docs = this.docsRepository.create(docsDto);
            return (0, rxjs_1.from)(this.docsRepository.save(docs));
        }
        catch (e) {
            console.error('DocsDbService.create', e);
            return null;
        }
    }
    getByUser(userId) {
        try {
            return (0, rxjs_1.from)(this.docsRepository.find({ where: { user_id: userId } }));
        }
        catch (e) {
            console.error('DocsDbService.getByUser', e);
            return null;
        }
    }
    update(docs) {
        try {
            return (0, rxjs_1.from)(this.docsRepository.update(docs.id, docs));
        }
        catch (e) {
            console.error('DocsDbService.update', e);
            return null;
        }
    }
    delete(id) {
        try {
            return (0, rxjs_1.from)(this.docsRepository.delete(id));
        }
        catch (e) {
            console.error('DocsDbService.delete', e);
            return null;
        }
    }
    deleteByUserId(user_id) {
        try {
            return (0, rxjs_1.from)(this.docsRepository.delete({ user_id }));
        }
        catch (e) {
            console.error('DocsDbService.deleteByUserId', e);
            return null;
        }
    }
};
exports.DocsDbService = DocsDbService;
exports.DocsDbService = DocsDbService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(docs_entity_1.Docs_Entity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocsDbService);
//# sourceMappingURL=docs.db.service.js.map