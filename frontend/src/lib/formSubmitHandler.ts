import type { AxiosError } from "axios";
import { axiosInstance } from "./axios";
import toast from "react-hot-toast";
import type { SuccessResponse } from "../shared/types/SuccessResponse";
import type { ErrorResponse } from "../shared/types/ErrorResponse";

export async function genericSubmitHandler<TRequest, TResponseData>(
  data: TRequest,
  path: string,
) {
  try {
    const response = await axiosInstance.post<SuccessResponse<TResponseData>>(
      path,
      data,
    );
    const result = response.data;
    toast.success(result.message);
    return result.data;
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>;

    if (!err.response) {
      toast.error("Unknown Error Occured!");
      return;
    }

    if (err.response.data) {
      toast.error(err.response.data.detail);
      return;
    }
    return null;
  }
}
