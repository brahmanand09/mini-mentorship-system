import { Request, Response } from "express";
import User from "../models/User";
import Student from "../models/Student";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: "student"
    });

    await Student.create({
      studentId: user._id.toString(), 
      name,
      email
    });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string
    );

    res.json({ token, role: user.role, id: user._id });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};