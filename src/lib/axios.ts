import axios from "axios";

import { SERVER_API_URL } from "@/constant";

const axiosInstance = axios.create({
  baseURL: SERVER_API_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "fa",
  },
});

export default axiosInstance;
