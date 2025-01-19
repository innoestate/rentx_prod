"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderStorageGoogleDriveStrategy = exports.getOath2Client = void 0;
const folder_storage_strategy_1 = require("./folder-storage.strategy");
const googleapis_1 = require("googleapis");
const common_1 = require("@nestjs/common");
const getOath2Client = async (accessToken, refreshToken, clientId, clientSecret) => {
    const oauth2Client = new googleapis_1.google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
    });
    await refreshTokenFunction(oauth2Client);
    return oauth2Client;
};
exports.getOath2Client = getOath2Client;
const refreshTokenFunction = async (oauth2Client) => {
    console.log('refresh token');
    await oauth2Client.refreshAccessToken().then(tokens => {
        oauth2Client.setCredentials(tokens.credentials);
        return tokens.credentials.access_token;
    });
};
let FolderStorageGoogleDriveStrategy = class FolderStorageGoogleDriveStrategy extends folder_storage_strategy_1.FolderStorageStrategy {
    constructor() {
        super();
        console.log('constructor google drive storage strategy');
    }
    async init(ccessToken, refreshToken, clientId, clientSecret) {
        const oauth2Client = await (0, exports.getOath2Client)(ccessToken, refreshToken, clientId, clientSecret);
        this.drive = googleapis_1.google.drive({
            version: 'v3',
            auth: oauth2Client
        });
    }
    async createFolder(path) {
        const folders_names = path.split('/');
        let lastParentId = null;
        let i = 0;
        while (i < folders_names.length) {
            try {
                const folderName = folders_names[i];
                let folderId;
                const folderExisting = await this.drive.files.list({
                    q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder'`,
                    fields: 'files(id)',
                });
                if (folderExisting.data.files.length > 0) {
                    folderId = folderExisting.data.files[0].id;
                    lastParentId = folderId;
                }
                else {
                    if (lastParentId) {
                        const newFolder = await this.drive.files.create({
                            requestBody: {
                                name: folderName,
                                mimeType: 'application/vnd.google-apps.folder',
                                parents: [lastParentId]
                            },
                            fields: 'id',
                        });
                        folderId = newFolder.data.id;
                    }
                    else {
                        const newFolder = await this.drive.files.create({
                            requestBody: {
                                name: folderName,
                                mimeType: 'application/vnd.google-apps.folder',
                            },
                            fields: 'id',
                        });
                        folderId = newFolder.data.id;
                    }
                }
                lastParentId = folderId;
            }
            catch (e) {
                console.log('error', e);
            }
            i++;
        }
        return lastParentId;
    }
    async updateFolderPath(id, path) {
        console.log('updateFolderPath WIP not implemented yet');
        const splittedPath = path.split('/');
        const newName = splittedPath[splittedPath.length - 1];
        await this.drive.files.update({
            fileId: id,
            requestBody: {
                name: newName,
            },
        });
    }
    async addFile(folder_id, file, fileName) {
        const fileMetadata = {
            name: fileName,
            parents: [folder_id],
        };
        const media = {
            mimeType: 'application/octet-stream',
            body: file,
        };
        const response = await this.drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });
        return response.data.id;
    }
    async getFolder(id) {
        const response = await this.drive.files.get({
            fileId: id,
            fields: 'id, name, mimeType, createdTime',
        });
        return {
            id: response.data.id,
            path: response.data.name,
        };
    }
    async getFiles(folder_id) {
        const response = await this.drive.files.list({
            q: `'${folder_id}' in parents and mimeType != 'application/vnd.google-apps.folder'`,
            fields: 'files(id, name, mimeType, size, createdTime)',
        });
        return response.data.files.map(file => ({
            id: file.id,
            name: file.name,
            path: file.name,
            content: file,
        }));
    }
};
exports.FolderStorageGoogleDriveStrategy = FolderStorageGoogleDriveStrategy;
exports.FolderStorageGoogleDriveStrategy = FolderStorageGoogleDriveStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FolderStorageGoogleDriveStrategy);
//# sourceMappingURL=folder-storage.google_drive.strategy.js.map