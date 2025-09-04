import axiosInstance from "../lib/axiosInstance";
import axios from "axios";

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: number };

export async function apiCall<T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  body?: unknown
): Promise<ApiResult<T>> {
  try {
    const response = await axiosInstance[method]<T>(url, body);
    return { success: true, data: response.data };
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return {
        success: false,
        error: err.response?.data?.message ?? err.message,
        code: err.response?.status,
      };
    }
    return { success: false, error: "Unexpected error" };
  }
}
