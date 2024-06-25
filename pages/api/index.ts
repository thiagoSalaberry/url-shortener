import { NextApiRequest, NextApiResponse } from "next";
import { UrlsController } from "@/backend/controllers/urls-controller";
import { Urls } from "@/backend/models/urls";
type ApiResponse = {
  message?: string;
  url?: Urls;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  try {
    const { shortURL } = req.query;
    if (!shortURL)
      return res.status(400).json({ message: "Short URL is required" });
    const { status, url } = await UrlsController.getUrlByShortURL(
      String(shortURL)
    );
    if (status == -1)
      return res.status(500).json({ message: "Error in server." });
    if (status == 0) return res.status(404).json({ message: "Url not found." });
    if (status == 1) return res.status(200).json({ url });
  } catch (error) {
    console.log("Error in server.");
    res.status(500).json({ message: "Error in server." });
  }
}
