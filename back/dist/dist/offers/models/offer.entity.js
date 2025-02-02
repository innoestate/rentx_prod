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
exports.Offer_Entity = void 0;
const typeorm_1 = require("typeorm");
const prospection_entity_1 = require("../../prospections/entities/prospection.entity");
let Offer_Entity = class Offer_Entity {
};
exports.Offer_Entity = Offer_Entity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Offer_Entity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Offer_Entity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Offer_Entity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Offer_Entity.prototype, "prospection_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Offer_Entity.prototype, "google_drive_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => prospection_entity_1.Prospection_Entity, prospection => prospection.offers, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'prospection_id' }),
    __metadata("design:type", prospection_entity_1.Prospection_Entity)
], Offer_Entity.prototype, "prospection", void 0);
exports.Offer_Entity = Offer_Entity = __decorate([
    (0, typeorm_1.Entity)('offers')
], Offer_Entity);
//# sourceMappingURL=offer.entity.js.map