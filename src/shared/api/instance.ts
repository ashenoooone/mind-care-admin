import axios, { AxiosError } from 'axios';
import { handlerApiErrors } from './utils';
import { LocalStorageManager } from '../lib/local-storage-manager';

export const $api = axios.create({
  baseURL: `/api`,
});

$api.interceptors.request.use(
  (config) => {
    const token =
      LocalStorageManager.getItem<string>('token');
    if (token) {
      config.headers.Authorization = token;
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
    return handlerApiErrors(error);
  }
);
