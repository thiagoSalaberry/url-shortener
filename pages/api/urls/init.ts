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
    await UrlsController.init();
    return res
      .status(201)
      .json({ message: "Table 'urls' created successfully." });
  } catch (error) {
    console.log("Error in server", error);
    return res.status(500).json({ message: "Error in server" });
  }
}
