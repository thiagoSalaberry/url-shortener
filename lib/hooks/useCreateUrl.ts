import { useState } from "react";
const BASE_URL = process.env.BASE_URL;
const URL_TO_CALL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : BASE_URL;

export function useCreateUrl() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<UrlResponse>();
  const createUrl = async (originalUrl: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const apiResponse = await fetch(`${URL_TO_CALL}/api/urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });
      if (apiResponse.status == 400) return setError(true);
      if (apiResponse.status == 404) return setError(true);
      if (apiResponse.status == 500) return setError(true);
      if (apiResponse.status == 200 || apiResponse.status == 201) {
        const data = (await apiResponse.json()) as UrlResponse;
        setData(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, data, createUrl };
}
