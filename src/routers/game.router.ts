import { Router } from "express";

import gameController from "../controllers/game.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const router = Router();
const GAMES = "/games";

router.post(
  `${GAMES}/game-result`,
  authenticateJWT,
  gameController.saveGameResult
);

router.get(
  `${GAMES}/holders`,
  authenticateJWT,
  gameController.getHoldersGameResult
);

export default router;
