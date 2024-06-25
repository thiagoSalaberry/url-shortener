import { useState } from "react";

export function useForm() {
  const [longUrl, setLongUrl] = useState<string>("");
  const [missing, setMissing] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  return {
    longUrl,
    setLongUrl,
    missing,
    setMissing,
    submitting,
    setSubmitting,
  };
}
