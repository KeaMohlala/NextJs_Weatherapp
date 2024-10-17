import bcrypt from "bcryptjs";
import { connectToDatabase } from "../../lib/mongodb";
import jwt from "jsonwebtoken"; // Add JWT import

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(422).json({ message: "Invalid input." });
    }

    const { db } = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User exists already!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      favourites: [], // New field for favorite cities
    });

    // Generate JWT Token
    const token = jwt.sign(
      { email: email, userId: result.insertedId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created!", token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
