import { useState } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const URL_TO_CALL =
  process.env.NODE_ENV == "development" ? "http://localhost:3000" : BASE_URL;

export function useURL() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const getURL = async (shortURL: string) => {
    setIsLoading(true);
    setError(false);
    try {
      const apiResponse = await fetch(
        `${URL_TO_CALL}/api?shortURL=${shortURL}`
      );
      if (apiResponse.status == 400) return setError(true);
      if (apiResponse.status == 404) return setError(true);
      if (apiResponse.status == 500) return setError(true);
      if (apiResponse.status == 200) {
        const data = await apiResponse.json();
        setData(data.url.original_url);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, error, data, getURL };
}
