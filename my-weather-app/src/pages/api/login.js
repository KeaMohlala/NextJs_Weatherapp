//src/pages/api/login.js: API route to handle login functionalities
import bcrypt from "bcryptjs"; //to compare passwords
import jwt from "jsonwebtoken"; //manage user sessions
import { connectToDatabase } from "../../lib/mongodb"; //function to retrieve user data

//function to handle the API request
export default async function handler(req, res) {
  //API route only accepts POST requests
  if (req.method === "POST") {
    const { email, password } = req.body; //extract email & password fields submitted by user

    const { db } = await connectToDatabase(); //establish connection to MongoDB database

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }

    // Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, userId: user._id });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
