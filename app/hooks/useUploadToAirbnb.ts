import { useCallback } from "react";

export const useUploadToAirbnb = (body: FormData) => {
  const upload = useCallback(async () => {
    const postData = await fetch("/api/listings/all", {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzOTk4Mjc2LCJpYXQiOjE2OTM5OTc5NzYsImp0aSI6IjI2MGIzYzAwMzhlODQ4Y2Y5Y2FkNjgwZTJhYzExNTY5IiwidXNlcl9pZCI6Mn0.Y-BV1m0aOuj0qSkPQ-bPbd4IzyYuVvcEtGyD77G4WZA`,
      },
      body,
    });
    const response = await postData.json();
    return response;
  }, [body]);

  return upload;
};
