// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "https://teoxys-url.vercel.app";
const URL_TO_CALL =
  process.env.NODE_ENV == "production" ? BASE_URL : "http://localhost:3000";

export const createURL = async (originalUrl: string): Promise<any> => {
  try {
    const apiResponse = await fetch(`${URL_TO_CALL}/api/urls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });
    if (apiResponse.status == 500) throw new Error("Error in server.");
    if (apiResponse.status == 200 || apiResponse.status == 201) {
      const data = await apiResponse.json();
      return data;
    }
  } catch (error) {
    console.log("Error in ApiCalls.createURL");
    throw error;
  }
};
