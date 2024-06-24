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
    const { urlId } = req.query;
    if (req.method == "GET") {
      const url = await UrlsController.getUrlById(Number(urlId));
      if (url.status == -1)
        return res.status(500).json({ message: "Error in server." });
      if (url.status == 0)
        return res.status(404).json({ message: "Url not found." });
      if (url.status == 1) return res.status(200).json({ url });
    }
    if (req.method == "PATCH") {
      const updatedUrl = await UrlsController.increaseHitCount(Number(urlId));
      if (updatedUrl.status == -1)
        return res.status(500).json({ message: "Error in server." });
      if (updatedUrl.status == 0)
        return res.status(404).json({ message: "Url not found." });
      if (updatedUrl.status == 1)
        return res.status(200).json({
          message: "URL hit_count increased successfully.",
          url: updatedUrl.url,
        });
    }
    if (req.method == "DELETE") {
      const deletedUrl = await UrlsController.deleteUrl(Number(urlId));
      if (deletedUrl.status == -1)
        return res.status(500).json({ message: "Error in server." });
      if (deletedUrl.status == 0)
        return res.status(404).json({ message: "Url not found." });
      if (deletedUrl.status == 1)
        return res.status(200).json({ message: "URL deleted successfully." });
    }
  } catch (error) {
    console.log("Error in server.");
    res.status(500).json({ message: "Error in server." });
  }
}
