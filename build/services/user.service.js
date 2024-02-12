"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_service_js_1 = __importDefault(require("./token.service.js"));
const user_dto_js_1 = __importDefault(require("../dto/user.dto.js"));
const api_error_js_1 = __importDefault(require("../exceptions/api.error.js"));
const prisma = new client_1.PrismaClient();
exports.default = new (class UserService {
    async register({ email, password }) {
        if (!email || !password)
            throw api_error_js_1.default.BadRequest();
        const candidate = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (candidate) {
            throw api_error_js_1.default.BadRequest("The user with this address is already registered");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 3);
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                nickname: email.split("@")[0]
            },
            select: {
                id: true,
                email: true,
                nickname: true
            }
        });
        const token = token_service_js_1.default.generateToken(JSON.parse(JSON.stringify(user)));
        return { user, token };
    }
    async login({ email, password }) {
        if (!email || !password)
            throw api_error_js_1.default.BadRequest();
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user)
            throw api_error_js_1.default.BadRequest("There is no user with such an email!");
        const isPassEquals = await bcrypt_1.default.compare(password, user.password);
        if (!isPassEquals)
            throw api_error_js_1.default.BadRequest("Incorrect login or password");
        const userDto = new user_dto_js_1.default(user);
        const token = token_service_js_1.default.generateToken(JSON.parse(JSON.stringify(userDto)));
        return { token };
    }
    async getUserById(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                nickname: true
            }
        });
        if (!user)
            throw api_error_js_1.default.NotFoundError();
        return user;
    }
    async getUserMe(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                email: true,
                nickname: true
            }
        });
        if (!user)
            throw api_error_js_1.default.NotFoundError();
        return user;
    }
})();
//# sourceMappingURL=user.service.js.map