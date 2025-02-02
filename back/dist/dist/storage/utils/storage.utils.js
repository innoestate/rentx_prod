"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProspectionFolderPath = void 0;
const getProspectionFolderPath = (prospection) => {
    if (prospection.address) {
        return `${prospection.address} ${prospection.city}`;
    }
    return `${prospection.city}_${prospection.price}`;
};
exports.getProspectionFolderPath = getProspectionFolderPath;
//# sourceMappingURL=storage.utils.js.map