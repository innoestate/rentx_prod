"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estateTests = void 0;
const rxjs_1 = require("rxjs");
const estate_utils_1 = require("../../estates/estate.utils");
const request = require("supertest");
const estates_mock_1 = require("../mocks/estates.mock");
const estateTests = (getApp, getUser, getEstateService) => {
    let estate;
    it('create estate', async () => {
        const user = getUser();
        const estateService = getEstateService();
        const formatedEstate = (0, estate_utils_1.formatEstateDtoToEstateDb)({ ...estates_mock_1.estateMock1 }, user.id);
        estate = await (0, rxjs_1.firstValueFrom)(estateService.create(formatedEstate));
        expect(estate.id).toBeTruthy();
    });
    it('get estate by id', async () => {
        const estateService = getEstateService();
        const estateById = await (0, rxjs_1.firstValueFrom)(estateService.getById(estate.id));
        expect(estateById.id).toEqual(estate.id);
    });
    it('remove estate', async () => {
        const user = getUser();
        const estateService = getEstateService();
        await (0, rxjs_1.firstValueFrom)(estateService.delete(estate.id));
        const estates = await estateService.getByUser(user.id);
        expect(estates.filter(estate_ => estate_.id === estate.id).length).toEqual(0);
    });
    it('POST /api/estates', async () => {
        const app = getApp();
        const response = await request(app.getHttpServer())
            .post('/api/estates')
            .send(estates_mock_1.estateMock2)
            .expect(201);
        expect(response.body.id).toBeTruthy();
    });
};
exports.estateTests = estateTests;
//# sourceMappingURL=estates-tests.js.map