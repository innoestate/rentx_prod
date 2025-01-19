"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rents_utils_1 = require("../rents.utils");
const rents_mocks_1 = require("./rents.mocks");
describe('testing geting start and end date from rents', () => {
    it('should return no unusedEstates', () => {
        const rents = [];
        const { startDate, endDate } = (0, rents_utils_1.getStartAndEnDatesFromRents)(rents);
        expect(startDate).toBeNull();
        expect(endDate).toBeNull();
    });
    it('should return correct start and end dates', () => {
        const rents = [{ ...rents_mocks_1.rent2021_01 }, { ...rents_mocks_1.rent2021_02 }];
        expect((0, rents_utils_1.getStartAndEnDatesFromRents)(rents).startDate).toEqual(rents[0].start_date);
        expect((0, rents_utils_1.getStartAndEnDatesFromRents)(rents).endDate).toEqual(rents[1].end_date);
    });
    it('should return correct start and end dates with inversed rents', () => {
        const rents = [{ ...rents_mocks_1.rent2021_01, end_date: new Date('2025-01-01') }, { ...rents_mocks_1.rent2021_02, start_date: new Date('2020-01-01') }];
        expect((0, rents_utils_1.getStartAndEnDatesFromRents)(rents).startDate).toEqual(rents[1].start_date);
        expect((0, rents_utils_1.getStartAndEnDatesFromRents)(rents).endDate).toEqual(rents[0].end_date);
    });
});
//# sourceMappingURL=rents.utils.spec.js.map