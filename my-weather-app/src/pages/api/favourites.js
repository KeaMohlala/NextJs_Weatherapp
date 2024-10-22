//src/pages/api/favourites.js: API route to add and remove favourite cities
import { connectToDatabase } from "../../lib/mongodb";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { token } = req.headers; //extract token from request headers
  //token is used to authenticate the user

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //ensure token is valid
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: decoded.userId }); //find user in database collection based on id

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const { city } = req.body; //extract city name from request body/user search

    if (req.method === "POST") {
      // Add city to favorites
      await db.collection("users").updateOne(
        { _id: user._id },
        { $addToSet: { favorites: city } } // $addToSet prevents duplicates
      );
      return res.status(200).json({ message: "City added to favorites" });
    }

    if (req.method === "DELETE") {
      // Remove city from favorites
      await db
        .collection("users")
        .updateOne({ _id: user._id }, { $pull: { favourites: city } });
      return res.status(200).json({ message: "City removed from favorites" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
