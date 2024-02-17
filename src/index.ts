// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import orderRoute from "./routes/order"; // Import the orderRoute from the correct path
import resetRoute from "./routes/reset"; // Import the resetRoute
import cors from "cors";
import morgan = require("morgan");
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api/reset", resetRoute);
app.use("/api/order", orderRoute); // Use the orderRoute for the /api/order route

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
