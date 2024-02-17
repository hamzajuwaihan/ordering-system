import express, { Router } from "express";
import reset from "../controllers/resetController";

const router: Router = express.Router();

router.post("/", reset);

export default router;
