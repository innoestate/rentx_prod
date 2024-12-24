"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rents_utils_1 = require("../rents.utils");
const rents_mocks_1 = require("./rents.mocks");
describe('test dates after a fusion of rents in multiple estates', () => {
    const rent1Estate2 = { ...rents_mocks_1.rent2021_01, estate_id: '2' };
    it('test of 2 rents in 2 differents estates', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rent1Estate2 }]);
        expect(rents.length).toEqual(2);
    });
    it('test total rent of half month rent', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2021_01, start_date: new Date('2021-01-15') }]);
        expect(rents[0].totalRent).toEqual(603);
    });
    it('should return 3 rents in 2 different estates', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rent1Estate2 }, { ...rents_mocks_1.rent2021_02 }]);
        expect(rents.length).toEqual(3);
        expect(rents[0].start_date.toISOString()).toEqual(rents_mocks_1.rent2020_12.start_date.toISOString());
        expect(rents[1].start_date.toISOString()).toEqual(rents_mocks_1.rent2021_02.start_date.toISOString());
        expect(rents[2].start_date.toISOString()).toEqual(rent1Estate2.start_date.toISOString());
    });
    it('should return 3 rents in 2 different estates', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rents_mocks_1.rent2021_01 }, { ...rent1Estate2 }, { ...rents_mocks_1.rent2021_02 }]);
        expect(rents.length).toEqual(2);
        expect(rents[0].start_date.toISOString()).toEqual(rents_mocks_1.rent2020_12.start_date.toISOString());
        expect(rents[0].end_date.toISOString()).toEqual(rents_mocks_1.rent2021_02.end_date.toISOString());
    });
});
//# sourceMappingURL=rents.fusion-multiple-estates.spec.js.map