import type { AxiosRequestConfig } from "axios";
import axiosUtils from "@think/axios-utils";
import { apiBase } from "@/utils/config";

/**
 * 基础路径
 */
export const baseURL = `${apiBase}api`;

/**
 * axios 工厂
 */
export const createAxiosInstance = (config?: AxiosRequestConfig) => {
  const http = axiosUtils.create({
    timeout: 60 * 1000,
    withCredentials: true,
    thinkExtractData: true,
    ...(config || {}),
  });

  return http;
};

/**
 * axios 实例
 */
export const axiosInstance = createAxiosInstance({ baseURL });

export default axiosInstance;
