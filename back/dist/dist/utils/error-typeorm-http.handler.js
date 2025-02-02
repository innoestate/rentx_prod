"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTypeormError = void 0;
const common_1 = require("@nestjs/common");
const handleTypeormError = (error) => {
    if (error.message.includes('duplicate key value violates unique constraint')) {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.CONFLICT,
            message: 'Cette ressource existe déjà.',
        }, common_1.HttpStatus.CONFLICT, {
            cause: error
        });
    }
};
exports.handleTypeormError = handleTypeormError;
//# sourceMappingURL=error-typeorm-http.handler.js.map