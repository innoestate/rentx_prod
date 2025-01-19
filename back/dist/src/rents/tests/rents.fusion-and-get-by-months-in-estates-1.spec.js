"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rents_utils_1 = require("../rents.utils");
const rents_mocks_1 = require("./rents.mocks");
describe('test fusion of rents in estates and divising it by months', () => {
    it('should return 1 rent in one month with correct total rent', () => {
        const rents = [{ ...rents_mocks_1.rent2024_01 }];
        const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(fusionnedRents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
    });
    it('should return 2 months of rents with correct total rent', () => {
        const rents = [{ ...rents_mocks_1.rent2024_01, end_date: new Date('2024-02-29') }];
        const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(fusionnedRents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
    });
    it('should return 2 months and a half of rents with correct total rent', () => {
        const rents = [{ ...rents_mocks_1.rent2024_01, end_date: new Date('2024-03-15') }];
        const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(fusionnedRents, rents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[0].sent).toEqual(false);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[2].rent).toEqual(532);
    });
    it('should return a half and 2 months and with correct total rent', () => {
        const rents = [{ ...rents_mocks_1.rent2024_01, start_date: new Date('2024-01-15'), sent: true, end_date: new Date('2024-03-31') }];
        const fusionnedRents = (0, rents_utils_1.fusionateRents)(rents);
        const rentsByMonth = (0, rents_utils_1.getRentsByMonth)(fusionnedRents, rents);
        expect(rentsByMonth.length).toBe(1);
        expect(rentsByMonth[0].rents[0].rent).toEqual(568);
        expect(rentsByMonth[0].rents[0].sent).toEqual(true);
        expect(rentsByMonth[0].rents[1].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[1].sent).toEqual(true);
        expect(rentsByMonth[0].rents[2].rent).toEqual(1100);
        expect(rentsByMonth[0].rents[2].sent).toEqual(true);
    });
});
//# sourceMappingURL=rents.fusion-and-get-by-months-in-estates-1.spec.js.map