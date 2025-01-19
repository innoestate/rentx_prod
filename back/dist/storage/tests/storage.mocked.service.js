"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageMockedService = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("../services/storage.service");
const folder_storage_mock_strategy_1 = require("../strategy/folder-storage.mock.strategy");
let StorageMockedService = class StorageMockedService extends storage_service_1.StorageService {
    constructor() {
        super(...arguments);
        this.folderStrategy = new folder_storage_mock_strategy_1.FolderStorageMockedStrategy();
    }
};
exports.StorageMockedService = StorageMockedService;
exports.StorageMockedService = StorageMockedService = __decorate([
    (0, common_1.Injectable)()
], StorageMockedService);
//# sourceMappingURL=storage.mocked.service.js.map