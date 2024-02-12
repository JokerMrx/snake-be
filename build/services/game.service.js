"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const api_error_js_1 = __importDefault(require("../exceptions/api.error.js"));
const prisma = new client_1.PrismaClient();
exports.default = new (class GameService {
    async saveGameResult(gameData, user_id) {
        const { score, game_name } = gameData;
        if (!game_name || score < 0)
            throw api_error_js_1.default.BadRequest();
        const game_result = await prisma.game_result.create({
            data: {
                game_name,
                score,
                user_id
            }
        });
        return game_result;
    }
    async getHoldersGameResult(game_name) {
        const games = await prisma.game_result.findMany({
            where: {
                game_name: game_name
            },
            include: {
                user: true
            },
            orderBy: {
                score: "desc"
            }
        });
        if (games.length === 0)
            throw api_error_js_1.default.NotFoundError();
        return games;
    }
})();
//# sourceMappingURL=game.service.js.map