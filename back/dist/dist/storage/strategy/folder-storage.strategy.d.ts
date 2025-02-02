import { FileStorage } from "../models/file";
import { StorageFolder } from "../models/folder";
export declare class FolderStorageStrategy {
    constructor();
    createFolder(path: string): Promise<string>;
    updateFolderPath(id: string, path: string): void;
    addFile(folder_id: string, file: any, fileName: string): Promise<string>;
    getFolder(id: string): Promise<StorageFolder | null>;
    getFiles(folder_id: string): Promise<FileStorage[]>;
}
