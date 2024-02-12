"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = __importDefault(require("../controllers/user.controller.js"));
const auth_middleware_js_1 = require("../middleware/auth.middleware.js");
const router = (0, express_1.Router)();
const REGISTER = "/register", LOGIN = "/login", USERS = "/users";
router.post(REGISTER, user_controller_js_1.default.register);
router.post(LOGIN, user_controller_js_1.default.login);
router.get(`${USERS}/:userId`, auth_middleware_js_1.authenticateJWT, user_controller_js_1.default.getUserById);
router.get(`${USERS}/me`, auth_middleware_js_1.authenticateJWT, user_controller_js_1.default.getMe);
exports.default = router;
//# sourceMappingURL=user.router.js.map