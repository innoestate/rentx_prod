"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextSpreadSheetSynchronization = exports.getLastSpreadSheetSynchronization = exports.formatProspectionDtoForCreation = void 0;
const formatProspectionDtoForCreation = (userId, createProspectionDto) => {
    const createProspectionDtoKeys = {
        city: '',
        address: '',
        link: '',
        price: 0,
        emission_date: new Date(),
    };
    return { ...createProspectionDtoKeys, ...createProspectionDto, user_id: userId };
};
exports.formatProspectionDtoForCreation = formatProspectionDtoForCreation;
const getLastSpreadSheetSynchronization = (lastSynchronization) => {
    return Date.now() - lastSynchronization;
};
exports.getLastSpreadSheetSynchronization = getLastSpreadSheetSynchronization;
const getNextSpreadSheetSynchronization = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
};
exports.getNextSpreadSheetSynchronization = getNextSpreadSheetSynchronization;
//# sourceMappingURL=prospections.utils.js.map