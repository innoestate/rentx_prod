import { StorageService } from "../services/storage.service";
import { FolderStorageMockedStrategy } from "../strategy/folder-storage.mock.strategy";
export declare class StorageMockedService extends StorageService {
    folderStrategy: FolderStorageMockedStrategy;
}
