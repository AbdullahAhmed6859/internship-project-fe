// axios.ts
import axios, { type AxiosInstance } from "axios";

class ApiClient {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL:
      import.meta.env.VITE_ENV === "PROD"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3000",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  public static get client(): AxiosInstance {
    return ApiClient.axiosInstance;
  }

  public static setToken(token: string) {
    ApiClient.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  public static clearToken() {
    delete ApiClient.axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default ApiClient;
