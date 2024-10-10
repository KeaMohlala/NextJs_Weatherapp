import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  res.status(200).json({ weather: data });
}
