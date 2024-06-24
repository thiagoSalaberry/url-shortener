import { NextApiRequest, NextApiResponse } from "next";
import { generateRandomURL } from "@/lib/generateRandomURL";
const BASE_URL = "https://url-shortener.vercel.app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const shortUrl = generateRandomURL(BASE_URL);
  res.status(201).json({ shortUrl });
}
