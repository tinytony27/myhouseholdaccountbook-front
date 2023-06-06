import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  // APIのURI
  baseURL: 'http://127.0.0.1:5000',
  // リクエストヘッダ
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
});

export default apiClient;
