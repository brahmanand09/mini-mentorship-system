import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";
import reviewRoutes from "./routes/review.routes";
import aiRoutes from "./routes/ai.routes";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);

app.use(errorHandler);

export default app;