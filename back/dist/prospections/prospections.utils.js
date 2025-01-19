"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatProspectionDtoForCreation = void 0;
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
//# sourceMappingURL=prospections.utils.js.map