import type { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";

export type ApiResponse<T = any> =
  | {
      success: true;
      data: T;
      message: string;
    }
  | {
      success: false;
      data: null;
      message: string;
    };

export async function genericSubmitHandler<TRequest, TResponseData>(
  data: TRequest,
  path: string,
) {
  try {
    const response = await axiosInstance.post<ApiResponse<TResponseData>>(
      path,
      data,
    );
    const result = response.data;

    // Because of the Discriminated Union, checking 'success'
    // unlocks type-safety for 'data'
    if (result.success) {
      toast.success(result.message);
      return result.data; // This will be typed as TResponseData
    }
  } catch (error) {
    const err = error as AxiosError<ApiResponse<TResponseData>>;

    if (err.response?.data) {
      toast.error(err.response.data.message);
    } else {
      toast.error("No response received. Please contact the administrator.");
    }
    return null;
  }
}
