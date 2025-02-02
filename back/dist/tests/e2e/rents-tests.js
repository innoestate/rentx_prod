"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentsTests = void 0;
const rxjs_1 = require("rxjs");
const request = require("supertest");
const rentsTests = (getApp, getRentsService) => {
    let estate = null;
    it('GET /api/rents/email', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];
        const response = await request(app.getHttpServer())
            .get('/api/rents/email?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();
        const rent = await (0, rxjs_1.firstValueFrom)(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);
        expect(rent[0].sent).toBeTruthy();
    });
    it('GET /api/rents/pdf', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];
        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();
        const rent = await (0, rxjs_1.firstValueFrom)(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);
    });
    it('GET /api/rents/pdf new rent erase if exists', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const responseEstate = await request(app.getHttpServer())
            .patch('/api/estate')
            .send({ id: estate.id, rent: 2000 })
            .expect(200);
        expect(responseEstate.body).toBeTruthy();
        const response = await request(app.getHttpServer())
            .get('/api/rents/pdf?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();
        const rent = await (0, rxjs_1.firstValueFrom)(rentService.getByEstate(estate.id));
        expect(rent.length).toBe(1);
        expect(rent[0].rent).toBe(2000);
    });
    it('GET /api/rents get monthly rents', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const response = await request(app.getHttpServer())
            .get('/api/rents')
            .expect(200);
        expect(response.body).toBeDefined();
        const rents = response.body;
        expect(rents.length).toBe(1);
        expect(rents[0].rents[0].rent).toBe(2000);
        expect(!!rents[0].rents[0].sent).toBe(true);
    });
    it('GET /api/rents/email', async () => {
        const app = getApp();
        const rentService = getRentsService();
        const responseEstate = await request(app.getHttpServer())
            .get('/api/estates')
            .expect(200);
        expect(responseEstate.body.length > 0).toBeTruthy();
        estate = responseEstate.body[0];
        const response = await request(app.getHttpServer())
            .get('/api/rents/email?estate=' + estate.id)
            .expect(200);
        expect(response.body).toBeDefined();
        const rentsResponse = await request(app.getHttpServer())
            .get('/api/rents')
            .expect(200);
        expect(rentsResponse.body).toBeDefined();
        const rent = rentsResponse.body[0].rents;
        expect(rent.length).toBe(1);
        expect(rent[0].sent).toBeTruthy();
    });
};
exports.rentsTests = rentsTests;
//# sourceMappingURL=rents-tests.js.map