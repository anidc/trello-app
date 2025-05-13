import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

instance.interceptors.request.use((config: AxiosRequestConfig): any => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  } else {
    return Promise.reject({
      response: { status: 401, message: "Unauthorized" },
    });
  }
  return config;
});

export default instance;
