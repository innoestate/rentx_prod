"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_utils_1 = require("../utils/storage.utils");
const storage_mocks_1 = require("./storage.mocks");
describe('testing storage utils', () => {
    it('should create a path from city and price', async () => {
        const path = (0, storage_utils_1.getProspectionFolderPath)(storage_mocks_1.prospections1_Without_Adress);
        expect(path).toEqual('ville-forte_100000');
    });
    it('should create a path from city and price', async () => {
        const path = (0, storage_utils_1.getProspectionFolderPath)(storage_mocks_1.prospections2_With_Adress);
        expect(path).toEqual('123 rue du test 12345 ville-forte');
    });
});
//# sourceMappingURL=storage.utils.spec.js.map