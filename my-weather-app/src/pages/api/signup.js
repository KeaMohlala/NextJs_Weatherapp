//src/pages/api/signup.js: handles signup functionalities
import bcrypt from "bcryptjs"; //password security
import { connectToDatabase } from "../../lib/mongodb"; //to store user data
import jwt from "jsonwebtoken"; // manage user sessions

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    //password, email and name are required
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
