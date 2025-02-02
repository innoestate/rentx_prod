"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsDbTests = void 0;
const rxjs_1 = require("rxjs");
const docsDbTests = (getApp, getUser, getDocsDbService) => {
    let doc;
    it('should create a doc with no content', async () => {
        const user = getUser();
        const docsDbService = getDocsDbService();
        await (0, rxjs_1.firstValueFrom)(docsDbService.create({ user_id: user?.id }));
        const docs = await (0, rxjs_1.firstValueFrom)(docsDbService.getByUser(user?.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].user_id).toBe(user?.id);
        doc = docs[0];
    });
    it('should update the doc with a propsections_google_sheet_id and lastSynchronization', async () => {
        const user = getUser();
        const docsDbService = getDocsDbService();
        const date = new Date();
        await (0, rxjs_1.firstValueFrom)(docsDbService.update({ id: doc.id, prospections_google_sheet_id: '123', lastSynchronization: date }));
        const docs = await (0, rxjs_1.firstValueFrom)(docsDbService.getByUser(user?.id));
        expect(docs?.length).toBe(1);
        expect(docs[0].user_id).toBe(user?.id);
        expect(docs[0].prospections_google_sheet_id).toBe('123');
        expect(docs[0].lastSynchronization).toEqual(date);
    });
};
exports.docsDbTests = docsDbTests;
//# sourceMappingURL=docs.db-tests.js.map