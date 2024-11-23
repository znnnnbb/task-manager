import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// In-memory user storage (replace with database in production)
const users = [];

// Secret key for JWT
const JWT_SECRET = "your_secret_key";

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the email already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { id: users.length + 1, username, email, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Find the user
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
