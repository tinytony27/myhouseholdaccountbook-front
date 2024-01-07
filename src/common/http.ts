import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  // baseURL: 'http://192.168.11.12:5000',
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // リクエストヘッダ
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
});

export default apiClient;
