import toast from "react-hot-toast";
import { axiosInstance } from "./axios";
import type { AxiosError } from "axios";
import type { ApiResponse } from "./formSubmitHandler";

export async function logout() {
  try {
    const response = await axiosInstance.post("/auth/logout");
    if (response.data) {
      toast.success(response.data.message);
    }
  } catch (error) {
    const err = error as AxiosError<ApiResponse>;

    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Error while logging out!");
    }
  }
}
