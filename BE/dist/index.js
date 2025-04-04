"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("./config/dotenv");
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.router);
app.get('/', (req, res) => {
    res.status(200).json({
        msg: "Jay Ganesh !"
    });
});
app.listen(dotenv_1.PORT, () => {
    console.log("server started on port number : ", dotenv_1.PORT);
});
