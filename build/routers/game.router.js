"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = __importDefault(require("../controllers/game.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const GAMES = "/games";
router.post(`${GAMES}/game-result`, auth_middleware_1.authenticateJWT, game_controller_1.default.saveGameResult);
router.get(`${GAMES}/holders`, auth_middleware_1.authenticateJWT, game_controller_1.default.getHoldersGameResult);
exports.default = router;
//# sourceMappingURL=game.router.js.map