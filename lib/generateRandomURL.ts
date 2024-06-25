import cryptoRandomString from "crypto-random-string";

export const generateRandomURL = (): string => {
  const chars: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const shortUrlLength: number = 6;
  const randomString: string = cryptoRandomString({
    length: shortUrlLength,
    characters: chars,
  });
  return randomString;
};
