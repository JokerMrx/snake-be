import { Router } from "express";

import userController from "../controllers/user.controller.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";

const router = Router();

const REGISTER = "/register",
  LOGIN = "/login",
  USERS = "/users";

router.post(REGISTER, userController.register);
router.post(LOGIN, userController.login);

router.get(`${USERS}/:userId`, authenticateJWT, userController.getUserById);
router.get(`${USERS}/me`, authenticateJWT, userController.getMe);

export default router;
