"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = __importDefault(require("./routes/order")); // Import the orderRoute from the correct path
const cors_1 = __importDefault(require("cors"));
const morgan = require("morgan");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(morgan('dev'));
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/api/order", order_1.default); // Use the orderRoute for the /api/order route
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map