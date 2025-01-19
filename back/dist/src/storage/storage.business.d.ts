import { ProspectionDb } from "src/prospections/dto/prospection.db";
import { FolderStorageStrategy } from "./strategy/folder-storage.strategy";
export declare const synchronizeFoldersStorage: (prospections: ProspectionDb[], strategy: FolderStorageStrategy) => Promise<{
    [key: string]: string;
}>;
