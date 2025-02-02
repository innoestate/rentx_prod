import { ProspectionDb } from "../prospections/dto/prospection.db";
import { FolderStorageStrategy } from "../storage/strategy/folder-storage.strategy";
export declare const addOffer: (propsection: ProspectionDb, offer: any, file: any, storageStrategy: FolderStorageStrategy) => Promise<void>;
