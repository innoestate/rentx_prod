import { FileStorage } from "../models/file";
import { StorageFolder } from "../models/folder";
import { FolderStorageStrategy } from "./folder-storage.strategy";
export declare const getOath2Client: (accessToken: string, refreshToken: string, clientId: string, clientSecret: string) => Promise<import("google-auth-library").OAuth2Client>;
export declare class FolderStorageGoogleDriveStrategy extends FolderStorageStrategy {
    private drive;
    constructor();
    init(ccessToken: string, refreshToken: string, clientId: string, clientSecret: string): Promise<void>;
    createFolder(path: string): Promise<string>;
    updateFolderPath(id: string, path: string): Promise<void>;
    addFile(folder_id: string, file: Buffer, fileName: string): Promise<string>;
    getFolder(id: string): Promise<StorageFolder>;
    getFiles(folder_id: string): Promise<FileStorage[]>;
}
