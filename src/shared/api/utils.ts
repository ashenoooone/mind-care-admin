import axios, { AxiosError } from 'axios';
import { ROUTES } from '../config/router-config';
import { queryClient } from '../providers/react-query-provider';

export const handleLogout = () => {
  queryClient.removeQueries();
  localStorage.clear();
  window.location.href = ROUTES.login;
};

export const handlerApiErrors = (
  error: AxiosError | Error
) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    switch (statusCode) {
      case 403:
        handleLogout();
        break;
      default:
        console.error(
          `Необработанная ошибка ${error.message}`
        );
        break;
    }
  }
};
