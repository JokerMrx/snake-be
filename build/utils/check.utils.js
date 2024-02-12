"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsValidEmail = void 0;
const checkIsValidEmail = (email) => /^[\w\-\\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
exports.checkIsValidEmail = checkIsValidEmail;
//# sourceMappingURL=check.utils.js.map