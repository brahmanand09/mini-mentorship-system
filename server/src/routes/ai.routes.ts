import express from "express";
import { aiSummary } from "../controllers/ai.controller";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/summarize", authMiddleware, aiSummary);

export default router;