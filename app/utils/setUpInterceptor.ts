import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axiosInstance from "./axiosInstance";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const setUpInterceptor = (): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);

  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};

export default setUpInterceptor;
