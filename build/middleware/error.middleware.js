"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_js_1 = __importDefault(require("../exceptions/api.error.js"));
exports.default = (err, req, res, next) => {
    console.log(err);
    if (err instanceof api_error_js_1.default) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
        next(); // so that there is no error that the "next" function is not used
    }
    return res.status(500).json({ message: "Internal Server Error" });
};
//# sourceMappingURL=error.middleware.js.map