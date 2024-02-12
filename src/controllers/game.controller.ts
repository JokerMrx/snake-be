import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/api.error";
import gameService from "../services/game.service";
import { AuthRequest } from "../models/request.types";

export default new (class GameController {
  async saveGameResult(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { score, game_name } = req.body;
      const { user } = req;

      if (isNaN(+user!.id)) throw ApiError.UnauthorizedError();

      if (score < 0)
        throw ApiError.BadRequest(
          "The number of points cannot be less than zero!"
        );

      if (!game_name)
        throw ApiError.BadRequest("The name of the game cannot be empty!");

      const game_result = await gameService.saveGameResult(
        { score, game_name },
        +user!.id
      );

      res.status(201).json(game_result);
    } catch (error) {
      next(error);
    }
  }

  async getHoldersGameResult(req: Request, res: Response, next: NextFunction) {
    try {
      const { game_name = "" } = req.query;

      const holders_game_result = await gameService.getHoldersGameResult(
        game_name.toString()
      );

      res.status(200).json(holders_game_result);
    } catch (error) {
      next(error);
    }
  }
})();
