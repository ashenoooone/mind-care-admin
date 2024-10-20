import axios, { AxiosError } from 'axios';
import { handlerApiErrors } from './utils';
import { LocalStorageManager } from '../lib/local-storage-manager';

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token =
      LocalStorageManager.getItem<string>('token');
    if (token) {
      config.params = { ...config.params, token };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => response,
  (error: AxiosError | Error) => {
    handlerApiErrors(error);
  }
);
