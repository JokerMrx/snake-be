import { PrismaClient } from "@prisma/client";
import { ISaveGameResult } from "../models/game.types.js";
import ApiError from "../exceptions/api.error.js";

const prisma = new PrismaClient();

export default new (class GameService {
  async saveGameResult(gameData: ISaveGameResult, user_id: number) {
    const { score, game_name } = gameData;

    if (!game_name || score < 0) throw ApiError.BadRequest();

    const game_result = await prisma.game_result.create({
      data: {
        game_name,
        score,
        user_id
      }
    });

    return game_result;
  }

  async getHoldersGameResult(game_name: string) {
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

    if (games.length === 0) throw ApiError.NotFoundError();

    return games;
  }
})();
