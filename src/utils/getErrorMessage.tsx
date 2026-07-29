import type { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errorSources?: {
    path: string;
    message: string;
  }[];
}

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
): string => {
  if ("data" in error) {
    const data = error.data as ApiErrorResponse;

    return (
      data.errorSources?.[0]?.message || data.message || "Something went wrong"
    );
  }

  if ("message" in error) {
    return error.message ?? "Something went wrong";
  }

  if ("error" in error) {
    return error.error;
  }

  return "Something went wrong";
};
