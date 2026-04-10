import { Request, Response } from "express";
import { generateSummary } from "../services/ai.service";

export const aiSummary = async (req: Request, res: Response) => {

  let feedback = req.body.feedback;

  if (!feedback) {
    return "No feedback provided";
  }

  const summary = await generateSummary(feedback);
  res.json({ summary });
};