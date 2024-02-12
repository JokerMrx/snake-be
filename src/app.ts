import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { API_V0_ADDRESS } from "./config/main.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import userRouter from "./routers/user.router.js";
import gameRouter from "./routers/game.router.js";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(API_V0_ADDRESS, userRouter);
app.use(API_V0_ADDRESS, gameRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("server working ...");
});
