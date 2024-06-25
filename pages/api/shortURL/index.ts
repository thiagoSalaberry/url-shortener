import { NextApiRequest, NextApiResponse } from "next";
import { UrlsController } from "@/backend/controllers/urls-controller";
import { Urls } from "@/backend/models/urls";
type ApiResponse = {
  message?: string;
  url?: Urls;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
  try {
    const { shortURL } = req.query;
    return res.send(shortURL);
  } catch (error) {
    console.log("Error in server.");
    res.status(500).json({ message: "Error in server." });
  }
}
