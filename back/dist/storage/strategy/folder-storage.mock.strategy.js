"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderStorageMockedStrategy = void 0;
const folder_storage_strategy_1 = require("./folder-storage.strategy");
class FolderStorageMockedStrategy extends folder_storage_strategy_1.FolderStorageStrategy {
    constructor() {
        super();
        this.folders = new Map();
        this.files = new Map();
    }
    async createFolder(path) {
        const id = Date.now().toString();
        this.folders.set(id, { id, path });
        return Promise.resolve(id);
    }
    updateFolderPath(id, path) {
        const folder = this.folders.get(id);
        if (folder) {
            folder.path = path;
        }
    }
    async addFile(folder_id, file, fileName) {
        const folder = await this.getFolder(folder_id);
        const id = Date.now().toString();
        const fileStorage = { id, name: fileName, path: folder?.path + '/' + fileName, content: file };
        if (!this.files.has(folder_id)) {
            this.files.set(folder_id, []);
        }
        this.files.get(folder_id)?.push(fileStorage);
        return Promise.resolve(id);
    }
    async getFolder(id) {
        return this.folders.get(id) || null;
    }
    async getFiles(folder_id) {
        return Promise.resolve(this.files.get(folder_id) || []);
    }
}
exports.FolderStorageMockedStrategy = FolderStorageMockedStrategy;
//# sourceMappingURL=folder-storage.mock.strategy.js.map