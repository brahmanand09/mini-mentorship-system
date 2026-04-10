import { Request, Response } from "express";
import Student from "../models/Student";
import { cleanStudents } from "../utils/dataCleaner";

export const getStudents = async (req: Request, res: Response) => {
  try {

    const students = await Student.find();

    const cleaned = cleanStudents({
      students: students.map(s => ({
        id: s.studentId,
        name: s.name,
        email: s.email,
        createdAt: s.createdAt,
        status: s.status
      }))
    });

    res.json({
      success: true,
      count: cleaned.length,
      data: cleaned
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {

  try {

    const { name, email, phone, targetYear } = req.body;

    const student = await Student.create({
      studentId: "stu_" + Date.now(),
      name,
      email,
      phone,
      targetYear
    });

    res.status(201).json(student);

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

};