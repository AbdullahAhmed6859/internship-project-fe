import axios, { type AxiosInstance } from "axios";

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    const baseURL =
      import.meta.env.VITE_ENV === "PROD"
        ? import.meta.env.VITE_BACKEND_URL
        : "http://localhost:3000";

    this.axiosInstance = axios.create({
      baseURL,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public get client(): AxiosInstance {
    return this.axiosInstance;
  }

  public setToken(token: string) {
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  public clearToken() {
    delete this.axiosInstance.defaults.headers.common["Authorization"];
  }
}

export default ApiClient;
