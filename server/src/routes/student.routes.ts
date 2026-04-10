import express from "express";
import {
  getStudents,
  createStudent
} from "../controllers/student.controller";
import { authMiddleware } from "../middlewares/auth";
import { body } from "express-validator";
import { validate } from "../middlewares/validate";


const router = express.Router();

router.get("/", authMiddleware, getStudents);
router.get("/secure", authMiddleware, getStudents);

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone")
      .optional()
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone must be 10 digits"),
    body("targetYear").optional().isNumeric()
  ],
  validate,
  createStudent
);

export default router;