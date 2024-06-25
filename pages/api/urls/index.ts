import { NextApiRequest, NextApiResponse } from "next";
import { UrlsController } from "@/backend/controllers/urls-controller";
import { Urls } from "@/backend/models/urls";
type ApiResponse = {
  message?: string;
  url?: Urls;
  allUrls?: Urls[] | [];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  try {
    if (req.method == "GET") {
      const allUrls = await UrlsController.getAll();
      return res.status(200).json({ allUrls });
    }
    if (req.method == "POST") {
      const { originalUrl } = req.body;
      const newUrl = await UrlsController.createUrl(originalUrl);
      if (newUrl.status == -1)
        return res.status(500).json({ message: "Error in server." });
      if (newUrl.status == 0)
        return res.status(200).json({
          message: "The requested url already existed.",
          url: newUrl.shortUrl,
        });
      return res.status(201).json({
        message: "Url created successfully.",
        url: newUrl.shortUrl,
      });
    }
  } catch (error) {
    console.log("Error in server", error);
    return res.status(500).json({ message: "Error in server." });
  }
}
