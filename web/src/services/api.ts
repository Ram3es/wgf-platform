import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants/config';
import { storageService } from './storage/storage';

export const POST = async <T, B = undefined>(
  endPoint: string,
  data?: B,
  responseTimeout?: number
): Promise<AxiosResponse<T>> =>
  getInstance(responseTimeout).post(`${BASE_URL}${endPoint}`, data);

export const UPDATE = async <T, B = undefined>(
  endPoint: string,
  data?: B
): Promise<AxiosResponse<T>> =>
  getInstance().put(`${BASE_URL}${endPoint}`, data);

export const GET = async <T>(endpoint: string): Promise<AxiosResponse<T>> =>
  getInstance().get(`${BASE_URL}${endpoint}`);

const getInstance = (responseTimeout?: number) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: responseTimeout || 20000,
  });
  instance.interceptors.request.use((config) => {
    const token = storageService.getToken();

    if (!token) {
      return config;
    }
    config = {
      ...config,
      headers: { Authorization: `Bearer ${token}` },
    };
    return config;
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error?.response?.status === 401 ||
        error?.response?.message === 'Token expired'
      ) {
        storageService.clearStorage();
        storageService.clearSessionStorage();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
