"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLodgerPost = void 0;
const formatLodgerPost = (lodger_post, user_id) => {
    return {
        ...lodger_post,
        user_id
    };
};
exports.formatLodgerPost = formatLodgerPost;
//# sourceMappingURL=lodger-utils.model.js.map