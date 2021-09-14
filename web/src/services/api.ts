import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants/config';
import { storageService } from './storage/storage';

export const POST = async <T, B>(
  endPoint: string,
  data: B
): Promise<AxiosResponse<T>> =>
  getInstance().post(`${BASE_URL}${endPoint}`, data);

export const GET = async <T, P = undefined>(
  endPoint: string,
  params?: P
): Promise<AxiosResponse<T>> => axios.get(`${BASE_URL}${endPoint}`, { params });

export const DELETE = async <T>(endPoint: string): Promise<AxiosResponse<T>> =>
  axios.delete(`${BASE_URL}${endPoint}`);

export const UPDATE = async <T, B>(
  endPoint: string,
  data: B
): Promise<AxiosResponse<T>> => axios.put(`${BASE_URL}${endPoint}`, data);

const getInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
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
      }
    }
  );

  return instance;
};
