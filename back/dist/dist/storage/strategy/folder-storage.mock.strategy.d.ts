import { FileStorage } from '../models/file';
import { StorageFolder } from '../models/folder';
import { FolderStorageStrategy } from './folder-storage.strategy';
export declare class FolderStorageMockedStrategy extends FolderStorageStrategy {
    private folders;
    private files;
    constructor();
    createFolder(path: string): Promise<string>;
    updateFolderPath(id: string, path: string): void;
    addFile(folder_id: string, file: any, fileName: string): Promise<string>;
    getFolder(id: string): Promise<StorageFolder | null>;
    getFiles(folder_id: string): Promise<FileStorage[]>;
}
