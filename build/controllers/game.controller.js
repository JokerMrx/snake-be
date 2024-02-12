"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = __importDefault(require("../exceptions/api.error"));
const game_service_1 = __importDefault(require("../services/game.service"));
exports.default = new (class GameController {
    async saveGameResult(req, res, next) {
        try {
            const { score, game_name } = req.body;
            const { user } = req;
            if (isNaN(+user.id))
                throw api_error_1.default.UnauthorizedError();
            if (score < 0)
                throw api_error_1.default.BadRequest("The number of points cannot be less than zero!");
            if (!game_name)
                throw api_error_1.default.BadRequest("The name of the game cannot be empty!");
            const game_result = await game_service_1.default.saveGameResult({ score, game_name }, +user.id);
            res.status(201).json(game_result);
        }
        catch (error) {
            next(error);
        }
    }
    async getHoldersGameResult(req, res, next) {
        try {
            const { game_name = "" } = req.query;
            console.log({ game_name });
            const holders_game_result = await game_service_1.default.getHoldersGameResult(game_name.toString());
            res.status(200).json(holders_game_result);
        }
        catch (error) {
            next(error);
        }
    }
})();
//# sourceMappingURL=game.controller.js.map