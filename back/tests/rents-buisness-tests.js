"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentsBuisnessTests = void 0;
const rxjs_1 = require("rxjs");
const estate_utils_1 = require("../estates/estate.utils");
const lodger_utils_model_1 = require("../lodgers/lodger-utils.model");
const owners_utils_1 = require("../owners/owners.utils");
const userId = 'c045b437-be01-4479-8598-9a4dc7dbe1b7';
const ownerExample = {
    user_id: userId,
    name: 'Jeff Bezos',
    email: 'jeffbezos@amazon.com',
    street: '1234 Amazon Street',
    city: 'Seattle',
    zip: '98101',
};
const lodgerExample = {
    name: 'Marc Simonsini',
    email: 'marcsimonsini@meetic.fr'
};
const estateExample = {
    street: '1234 Estate Street',
    city: 'Seattle',
    zip: '98101',
    rent: '0',
    charges: '0'
};
const rentsBuisnessTests = (getEstateService, getOwnerService, getLodgerService) => {
    let estate;
    let owner;
    let lodger;
    it('create estate, owner and lodger for rent receipt', async () => {
        const estateService = getEstateService();
        const ownerService = getOwnerService();
        const lodgerService = getLodgerService();
        const formatedOwner = (0, owners_utils_1.formatOwnerDtoToOwnerDb)(ownerExample, userId);
        owner = await (0, rxjs_1.lastValueFrom)(ownerService.create(formatedOwner));
        const formatedLodger = (0, lodger_utils_model_1.formatLodgerPost)(lodgerExample, userId);
        lodger = await (0, rxjs_1.lastValueFrom)(lodgerService.create(formatedLodger));
        estateExample.owner_id = owner.id;
        estateExample.lodger_id = lodger.id;
        const formatedEstate = (0, estate_utils_1.formatEstateDtoToEstateDb)(estateExample, userId);
        estate = await (0, rxjs_1.lastValueFrom)(estateService.create(formatedEstate));
        expect(estate).toBeDefined();
    });
};
exports.rentsBuisnessTests = rentsBuisnessTests;
//# sourceMappingURL=rents-buisness-tests.js.map