"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = new (class TokenService {
    generateToken(payload, term = 30) {
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY ?? "", {
            expiresIn: `${term}d`
        });
        return token;
    }
    decodeToken(token) {
        const payload = jsonwebtoken_1.default.decode(token);
        return payload;
    }
    validateToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY ?? "");
    }
})();
//# sourceMappingURL=token.service.js.map