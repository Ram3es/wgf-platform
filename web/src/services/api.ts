import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '../constants/config';

export const POST = async <T, B>(
  endPoint: string,
  data: B
): Promise<AxiosResponse<T>> => axios.post(`${BASE_URL}${endPoint}`, data);

export const GET = async <T, P = undefined>(
  endPoint: string,
  params?: P
): Promise<AxiosResponse<T>> => axios.get(`${BASE_URL}${endPoint}`, { params });

export const DELETE = async <T>(endPoint: string): Promise<AxiosResponse<T>> =>
  axios.delete(`${BASE_URL}${endPoint}`);

export const UPDATE = async <T, B>(
  endPoint: string,
  data: B
): Promise<AxiosResponse<T>> => axios.patch(`${BASE_URL}${endPoint}`, data);
