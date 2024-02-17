// routes/order.ts
import express, { Router } from "express";
import { addNewOrder } from "../controllers/orderController";
import orderValidationMiddleware from "../middlewares/orderMiddleware";

const router: Router = express.Router();

router.post("/", orderValidationMiddleware, addNewOrder);

export default router;
