import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const createMentor = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    const existing = await User.findOne({ email: "mentor@test.com" });

    if (existing) {
      console.log("Mentor already exists");
      process.exit();
    }

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      name: "Mentor",
      email: "mentor@test.com",
      password: hash,
      role: "mentor"
    });

    console.log("✅ Mentor created successfully");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createMentor();