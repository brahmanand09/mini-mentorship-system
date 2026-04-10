import { Request, Response } from "express";
import Review from "../models/Review";
import { generateSummary } from "../services/ai.service";

export const addReview = async (req: Request, res: Response) => {

    try {

        const { studentId, review } = req.body;

        const aiSummary = await generateSummary(review);

        if ((req as any).user.role !== "mentor") {
            return res.status(403).json({ message: "Only mentor can add review" });
        }

        const newReview = await Review.create({
            studentId,
            mentorId: (req as any).user.id,
            review,
            aiSummary
        } as any);

        res.status(201).json(newReview);

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }

};

export const getReviews = async (req: Request, res: Response) => {

    try {

        const reviews = await Review.find({
            studentId: req.params.studentId as string
        }).sort({ createdAt: -1 });

        res.json(reviews);

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }

};