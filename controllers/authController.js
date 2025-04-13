import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validations/authValidation.js";

// Register a user
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error)
      return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered!!" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashed });

    
    const token = jwt.sign({ userId: newUser._id, email:newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ message: "User registered successfully",token : token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, email:user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message:"user logged in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
