import { NextApiRequest, NextApiResponse } from "next";
import { UrlsController } from "@/backend/controllers/urls-controller";
type ApiResponse = {
  message: string;
};
export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  try {
    const drop = await UrlsController.drop();
    if (!drop)
      return res.status(404).json({ message: "Table 'urls' does not exist." });
    return res
      .status(200)
      .json({ message: "Table 'urls' dropped successfully." });
  } catch (error) {
    console.log("Error in server", error);
    return res.status(500).json({ message: "Error in server" });
  }
}
