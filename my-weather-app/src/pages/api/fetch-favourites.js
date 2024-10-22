//src / pages / api / fetchfavourites: retrieves the list of favorite cities.
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
    //The decoded token contains user details (like userId).
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ _id: decoded.userId }); //find user in database collection based on id
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
}
