import { connectToDatabase } from "../../lib/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
