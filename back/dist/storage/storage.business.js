"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronizeFoldersStorage = void 0;
const storage_utils_1 = require("./utils/storage.utils");
const synchronizeFoldersStorage = async (prospections, strategy) => {
    const createdFolders = {};
    console.log('synchronizeFoldersStorage');
    let i = 0;
    while (i < prospections.length) {
        let createdId = await synchronizeProspection(prospections[i], strategy);
        if (createdId) {
            createdFolders[prospections[i].id] = createdId;
        }
        i++;
    }
    return createdFolders;
};
exports.synchronizeFoldersStorage = synchronizeFoldersStorage;
const synchronizeProspection = async (prospection, strategy) => {
    if (!await updateExistingFolder(prospection, strategy)) {
        return createFolder(prospection, strategy);
    }
    return null;
};
const updateExistingFolder = async (prospection, strategy) => {
    if (prospection.storage_folder_id === null) {
        return false;
    }
    const path = (0, storage_utils_1.getProspectionFolderPath)(prospection);
    const folder = await strategy.getFolder(prospection.storage_folder_id);
    if (!folder) {
        return false;
    }
    else if (folder.path !== path) {
        await strategy.updateFolderPath(prospection.storage_folder_id, path);
    }
    return true;
};
const createFolder = async (prospection, strategy) => {
    const path = (0, storage_utils_1.getProspectionFolderPath)(prospection);
    console.log('createFolder', path);
    return await strategy.createFolder('prospections/' + path);
};
//# sourceMappingURL=storage.business.js.map