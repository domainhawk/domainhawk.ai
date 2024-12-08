import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      const result = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return result;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
