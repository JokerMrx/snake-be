"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const getToken = (tokenBearer) => tokenBearer?.split(" ")[1] ?? "";
exports.getToken = getToken;
//# sourceMappingURL=token.utils.js.map