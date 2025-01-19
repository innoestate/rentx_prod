"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromatEstateForPatch = exports.formatEstateDtoToEstateDb = void 0;
const formatEstateDtoToEstateDb = (estateDto, userId) => {
    const estateForDb = {
        user_id: userId,
        street: estateDto.street,
        city: estateDto.city,
        zip: estateDto.zip,
        plot: estateDto.plot ?? '',
        owner_id: estateDto.owner_id ?? '',
        lodger_id: estateDto.lodger_id ?? '',
    };
    if (parseFloat(estateDto.rent)) {
        estateForDb.rent = parseFloat(estateDto.rent);
    }
    else {
        estateForDb.rent = 0;
    }
    if (parseFloat(estateDto.charges)) {
        estateForDb.charges = parseFloat(estateDto.charges);
    }
    else {
        estateForDb.charges = 0;
    }
    return estateForDb;
};
exports.formatEstateDtoToEstateDb = formatEstateDtoToEstateDb;
const fromatEstateForPatch = (data) => {
    let patchData = {
        id: data.id
    };
    if (data.plot && typeof data.plot === 'string') {
        patchData = { ...patchData, plot: data.plot };
    }
    if (data.rent) {
        let rent = asNumber(data.rent);
        if (rent !== null) {
            patchData = { ...patchData, rent: rent };
        }
    }
    if (data.charges) {
        let charges = asNumber(data.charges);
        if (charges !== null) {
            patchData = { ...patchData, charges: charges };
        }
    }
    if (data.owner_id && typeof data.owner_id === 'string') {
        patchData = { ...patchData, owner_id: data.owner_id };
    }
    if (data.owner_id === null || data.owner_id === '') {
        patchData = { ...patchData, owner_id: '' };
    }
    if (data.lodger_id && typeof data.lodger_id === 'string') {
        patchData = { ...patchData, lodger_id: data.lodger_id };
    }
    if (data.lodger_id === null || data.lodger_id === '') {
        patchData = { ...patchData, lodger_id: '' };
    }
    return patchData;
};
exports.fromatEstateForPatch = fromatEstateForPatch;
let asNumber = (value) => {
    if (typeof value === 'number') {
        return value;
    }
    try {
        return parseFloat(value);
    }
    catch (e) {
        return null;
    }
};
//# sourceMappingURL=estate.utils.js.map