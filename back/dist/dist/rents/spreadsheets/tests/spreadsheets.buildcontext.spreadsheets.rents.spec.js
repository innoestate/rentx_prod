"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rents_spreadsheets_utils_1 = require("../rents.spreadsheets.utils");
const estate = {
    id: '0',
    user_id: '1',
    owner: {
        id: '1',
        user_id: '1',
        name: 'Elon Musk',
        street: '1 rue de lespace',
        city: 'Paris',
        zip: 'Z7',
        signature: '1234',
        email: '1234',
        phone: '1234',
    },
    lodger: {
        id: '2',
        user_id: '1',
        email: '1234',
        name: 'Jeff Bezos',
        created_at: new Date('2024-02-01'),
        updated_at: new Date('2024-02-29'),
    },
    street: '1 rue de lespace',
    city: 'Paris',
    zip: 'Z7',
};
describe('testing removing unusedEstates', () => {
    it('should return no unusedEstates', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        };
        const estates = [];
        const unusedEstates = (0, rents_spreadsheets_utils_1.getUnusedEstates)(spreadSheet, estates);
        expect(unusedEstates.length).toEqual(0);
    });
    it('should return no unusedEstates', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        };
        const unusedEstates = (0, rents_spreadsheets_utils_1.getUnusedEstates)(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(0);
    });
    it('should return 1 unusedEstates', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                    sheetId: 0,
                    title: '2024',
                    rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                        [{ value: 'Jean Marc' }, { value: '1 rue machin' }, { value: 'Paris' }, { value: '1' }]]
                }]
        };
        const unusedEstates = (0, rents_spreadsheets_utils_1.getUnusedEstates)(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(1);
    });
    it('should return 0 unusedEstates', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                    sheetId: 0,
                    title: '2024',
                    rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                        [{ value: 'Jean Marc' }, { value: '1 rue de lespace' }, { value: 'Paris' }, { value: '' }]]
                }]
        };
        const unusedEstates = (0, rents_spreadsheets_utils_1.getUnusedEstates)(spreadSheet, [estate]);
        expect(unusedEstates.length).toEqual(0);
    });
    it('should return no missingRows', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: []
        };
        const estates = [];
        const missingRows = (0, rents_spreadsheets_utils_1.getMissingRows)(spreadSheet, estates);
        expect(missingRows.length).toEqual(0);
    });
    it('should return 0 missingRows', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                    sheetId: 0,
                    title: '2024',
                    rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                        [{ value: 'Jean Marc' }, { value: '1 rue de lespace' }, { value: 'Paris' }, { value: '' }]]
                }]
        };
        const estates = [estate];
        const missingEstates = (0, rents_spreadsheets_utils_1.getMissingRows)(spreadSheet, estates);
        expect(missingEstates[0].missingRows.length).toEqual(0);
    });
    it('should return 1 missingRows', async () => {
        const spreadSheet = {
            id: '',
            title: 'test',
            sheets: [{
                    sheetId: 0,
                    title: '2024',
                    rows: [[{ value: 'Propriétaire' }, { value: 'Adresse' }, { value: 'Ville' }, { value: 'Lot' }],
                        [{ value: 'Jean Marc' }, { value: '1 rue hello world' }, { value: 'Los Angeles' }, { value: 'A1' }]]
                }]
        };
        const estates = [estate];
        const missingEstates = (0, rents_spreadsheets_utils_1.getMissingRows)(spreadSheet, estates);
        expect(missingEstates[0].missingRows.length).toEqual(1);
    });
});
//# sourceMappingURL=spreadsheets.buildcontext.spreadsheets.rents.spec.js.map