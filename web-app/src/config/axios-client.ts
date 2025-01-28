import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    // Obtém o token do localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Adiciona o token ao cabeçalho Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
