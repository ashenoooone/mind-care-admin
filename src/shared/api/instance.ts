import axios, { AxiosError } from 'axios';
import { handlerApiErrors } from './utils';

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

$api.interceptors.response.use(
  (response) => response,
  (error: AxiosError | Error) => {
    handlerApiErrors(error);
  }
);
