"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_utils_js_1 = require("../utils/token.utils.js");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = (0, token_utils_js_1.getToken)(authHeader);
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY ?? "", (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (decoded && typeof decoded === "object") {
                req.user = decoded;
            }
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=auth.middleware.js.map