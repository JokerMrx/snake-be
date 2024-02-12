"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_js_1 = __importDefault(require("../services/user.service.js"));
const api_error_js_1 = __importDefault(require("../exceptions/api.error.js"));
const check_utils_js_1 = require("../utils/check.utils.js");
exports.default = new (class User {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const isValidEmail = (0, check_utils_js_1.checkIsValidEmail)(email);
            if (!isValidEmail || password.length < 8)
                throw api_error_js_1.default.BadRequest("Invalid email or password!");
            const user = await user_service_js_1.default.register({ email, password });
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const isValidEmail = (0, check_utils_js_1.checkIsValidEmail)(email);
            if (!isValidEmail || password.length < 8)
                throw api_error_js_1.default.BadRequest("Invalid email or password!");
            const token = await user_service_js_1.default.login({ email, password });
            res.status(201).json(token);
        }
        catch (error) {
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
        }
        catch (error) {
            next(error);
        }
    }
    async getMe(req, res, next) {
        try {
        }
        catch (error) {
            next(error);
        }
    }
})();
//# sourceMappingURL=user.controller.js.map