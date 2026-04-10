import express from "express";
import {
  addReview,
  getReviews
} from "../controllers/review.controller";
import { authMiddleware } from "../middlewares/auth";
import { roleMiddleware } from "../middlewares/role";

const router = express.Router();

router.get("/:studentId", authMiddleware, getReviews);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("mentor"),
  addReview
);

export default router;