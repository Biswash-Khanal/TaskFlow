import axios from "axios";
import { env } from "./env";

export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  allowAbsoluteUrls: false,
  timeoutErrorMessage: "Request Timed out (2 seconds)",
});
