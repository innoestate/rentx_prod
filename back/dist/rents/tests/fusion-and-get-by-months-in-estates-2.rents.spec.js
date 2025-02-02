"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rents_utils_1 = require("../rents.utils");
const rents_mocks_1 = require("./rents.mocks");
describe('test rents by months', () => {
    const rent2021_01_Estate2 = { ...rents_mocks_1.rent2021_01, estate_id: '2' };
    it('should return 1 in a month', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth.length).toEqual(1);
        expect(rentsByMonth[0].estateId).toEqual('1');
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
    });
    it('should return 2 rents in 2 months in one estate', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2021_01 }, { ...rents_mocks_1.rent2021_02 }]);
        expect(rents.length).toEqual(1);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2021);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].month).toEqual(0);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].month).toEqual(1);
    });
    it('should return 2 rent in 2 months in one estate between 2 years, test sent in first rent', () => {
        const rents = [{ ...rents_mocks_1.rent2020_12, sent: true }, { ...rents_mocks_1.rent2021_01 }];
        const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents);
        expect(fusionnedRents.length).toEqual(1);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(fusionnedRents, rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].sent).toEqual(true);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].month).toEqual(0);
        expect(rentsByMonth[0].rents[1].sent).toEqual(false);
    });
    it('should return 2 rents in 2 months in one estate and one rent in one month in an other estate', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rents_mocks_1.rent2021_01 }, { ...rent2021_01_Estate2 }]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);
    });
    it('should return 2 rents for 2 separate months', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rents_mocks_1.rent2021_02 }]);
        expect(rents.length).toEqual(2);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].year).toEqual(2021);
        expect(rentsByMonth[0].rents[1].month).toEqual(1);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    });
    it('should return rents in 2 estates', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2020_12 }, { ...rent2021_01_Estate2 }]);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents.length).toEqual(1);
        expect(rentsByMonth[0].rents[0].year).toEqual(2020);
        expect(rentsByMonth[0].rents[0].month).toEqual(11);
        expect(rentsByMonth[1].rents[0].month).toEqual(0);
    });
    it('should return 2 rents with one of a half month', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2021_01, start_date: new Date('2021-01-15') }, { ...rents_mocks_1.rent2021_02 }]);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents.length).toEqual(2);
        expect(rentsByMonth[0].rents[0].year).toEqual(2021);
        expect(rentsByMonth[0].rents[0].month).toEqual(0);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    });
    it('should return a rent of a half month', () => {
        const rents = (0, rents_utils_1.fusionateRents)([{ ...rents_mocks_1.rent2021_01, start_date: new Date('2021-01-15') }]);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(rents);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
    });
});
//# sourceMappingURL=fusion-and-get-by-months-in-estates-2.rents.spec.js.map