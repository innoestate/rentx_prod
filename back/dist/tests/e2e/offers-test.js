"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offersTests = void 0;
const request = require("supertest");
const db_utils_1 = require("../utils/db.utils");
const offersTests = (getApp) => {
    let prospection;
    it('/api/prospections (POST) in offers tests', async () => {
        await (0, db_utils_1.emptyingTable)('prospections');
        await (0, db_utils_1.emptyingTable)('sellers');
        const app = getApp();
        await request(app.getHttpServer())
            .post('/api/prospections')
            .send({
            city: 'Test City',
            address: 'Test Address',
            price: 100000,
            emission_date: new Date().toISOString(),
        })
            .expect(201);
    });
    it('/api/prospections (GET) in offers tests', async () => {
        const app = getApp();
        const response = await request(app.getHttpServer())
            .get('/api/prospections')
            .expect(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        prospection = response.body[0];
    });
    it('/api/prospections/offers/add (POST) in offers tests', async () => {
        const app = getApp();
        const price = 100000;
        const response = await request(app.getHttpServer())
            .post(`/api/prospections/offers/add?prospection_id=${prospection.id}&price=${price}`)
            .send(Buffer.from('test'))
            .expect(201);
        expect(response.body.id).toBeTruthy();
        expect(response.body.price).toEqual(price + '');
        expect(response.body.prospection_id).toEqual(prospection.id);
    });
    it('/api/prospections/offers (GET)', async () => {
        const app = getApp();
        const response = await request(app.getHttpServer())
            .get(`/api/prospections/offers/get`)
            .expect(200);
        expect(response.body.length).toEqual(1);
        expect(response.body[0].id).toBeTruthy();
        expect(response.body[0].prospection_id).toEqual(prospection.id);
    });
};
exports.offersTests = offersTests;
//# sourceMappingURL=offers-test.js.map