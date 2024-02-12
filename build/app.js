"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const main_config_js_1 = require("./config/main.config.js");
const error_middleware_js_1 = __importDefault(require("./middleware/error.middleware.js"));
const user_router_js_1 = __importDefault(require("./routers/user.router.js"));
const game_router_js_1 = __importDefault(require("./routers/game.router.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(main_config_js_1.API_V0_ADDRESS, user_router_js_1.default);
app.use(main_config_js_1.API_V0_ADDRESS, game_router_js_1.default);
app.use(error_middleware_js_1.default);
app.listen(port, () => {
    console.log("server working ...");
});
//# sourceMappingURL=app.js.map