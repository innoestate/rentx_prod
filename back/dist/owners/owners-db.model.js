"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOwner = void 0;
const formatOwner = (owner) => {
    return {
        user_id: owner.user_id,
        name: owner.name ?? '',
        street: owner.street ?? '',
        city: owner.city ?? '',
        zip: owner.zip ?? '',
        signature: owner.signature ?? '',
        email: owner.email ?? '',
        phone: owner.phone ?? '',
    };
};
exports.formatOwner = formatOwner;
//# sourceMappingURL=owners-db.model.js.map