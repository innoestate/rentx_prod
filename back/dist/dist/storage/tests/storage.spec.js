"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_business_1 = require("../storage.business");
const folder_storage_mock_strategy_1 = require("../strategy/folder-storage.mock.strategy");
const storage_utils_1 = require("../utils/storage.utils");
const storage_mocks_1 = require("./storage.mocks");
let storageService;
describe('testing storage folders', () => {
    const strategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
    it('should not create a folder', async () => {
        const strategyWithOneFolder = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        const folder_id = await strategyWithOneFolder.createFolder('fake_path');
        const createdFolders = await (0, storage_business_1.synchronizeFoldersStorage)([{ ...storage_mocks_1.prospections1_Without_Adress, storage_folder_id: folder_id }], strategyWithOneFolder);
        expect((createdFolders[storage_mocks_1.prospections1_Without_Adress.id])).toBeFalsy();
    });
    it('should create a folder', async () => {
        const createdFolders = await (0, storage_business_1.synchronizeFoldersStorage)([storage_mocks_1.prospections1_Without_Adress], strategy);
        expect((createdFolders[storage_mocks_1.prospections1_Without_Adress.id])).toBeTruthy();
    });
    it('should got the same path folder', async () => {
        const strategyWithOneFolder = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        const folder_id = await strategyWithOneFolder.createFolder((0, storage_utils_1.getProspectionFolderPath)(storage_mocks_1.prospections1_Without_Adress));
        const prospection = { ...storage_mocks_1.prospections1_Without_Adress, storage_folder_id: folder_id };
        await (0, storage_business_1.synchronizeFoldersStorage)([prospection], strategyWithOneFolder);
        const folderCreated = await strategyWithOneFolder.getFolder(folder_id);
        expect((folderCreated?.path)).toEqual((0, storage_utils_1.getProspectionFolderPath)(prospection));
    });
    it('should update the path folder', async () => {
        const strategyWithOneFolder = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        const oldPath = (0, storage_utils_1.getProspectionFolderPath)(storage_mocks_1.prospections1_Without_Adress);
        const folder_id = await strategyWithOneFolder.createFolder(oldPath);
        const prospection = { ...storage_mocks_1.prospections1_Without_Adress, storage_folder_id: folder_id, address: '123 rue du test 12345 ville-forte' };
        const newPath = (0, storage_utils_1.getProspectionFolderPath)(prospection);
        await (0, storage_business_1.synchronizeFoldersStorage)([prospection], strategyWithOneFolder);
        const folderCreated = await strategyWithOneFolder.getFolder(folder_id);
        expect(newPath).not.toEqual(oldPath);
        expect((folderCreated?.path)).toEqual(newPath);
    });
    it('should create 2 folders', async () => {
        const newStrategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        const createdFolders = await (0, storage_business_1.synchronizeFoldersStorage)([storage_mocks_1.prospections1_Without_Adress, storage_mocks_1.prospections2_With_Adress], newStrategy);
        expect((createdFolders[storage_mocks_1.prospections1_Without_Adress.id])).toBeTruthy();
        expect((createdFolders[storage_mocks_1.prospections2_With_Adress.id])).toBeTruthy();
    });
    it('should create 2 folder from 2 prospections', async () => {
        const newStrategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
        const folder_id = await newStrategy.createFolder((0, storage_utils_1.getProspectionFolderPath)(storage_mocks_1.prospections1_Without_Adress));
        const createdFolders = await (0, storage_business_1.synchronizeFoldersStorage)([{ ...storage_mocks_1.prospections1_Without_Adress, storage_folder_id: folder_id }, storage_mocks_1.prospections2_With_Adress], newStrategy);
        expect((createdFolders[storage_mocks_1.prospections1_Without_Adress.id])).toBeFalsy();
        expect((createdFolders[storage_mocks_1.prospections2_With_Adress.id])).toBeTruthy();
    });
});
//# sourceMappingURL=storage.spec.js.map