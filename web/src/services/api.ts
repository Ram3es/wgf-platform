import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants/config';
import { storageService } from './storage/storage';

export const POST = async <T, B = undefined>(
  endPoint: string,
  data?: B
): Promise<AxiosResponse<T>> =>
  getInstance().post(`${BASE_URL}${endPoint}`, data);

export const UPDATE = async <T, B = undefined>(
  endPoint: string,
  data?: B
): Promise<AxiosResponse<T>> =>
  getInstance().put(`${BASE_URL}${endPoint}`, data);

const getInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
  });
  instance.interceptors.request.use((config) => {
    const token = storageService.getToken();
    if (!token) {
      return config;
    }
    config = {
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
        window.location.reload();
      }

      return Promise.reject(error);
    }
  );

  return instance;
};
