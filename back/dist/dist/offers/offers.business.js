"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOffer = void 0;
const addOffer = async (propsection, offer, file, storageStrategy) => {
    storageStrategy.addFile(propsection.storage_folder_id, file, 'offre_test.pdf');
};
exports.addOffer = addOffer;
//# sourceMappingURL=offers.business.js.map