export const ERROR_MAPPER = {
  'Request failed with status code 401': 'Неверные данные',
};

export const mapLoginErrorToText = (error: string) => {
  if (error in ERROR_MAPPER)
    return ERROR_MAPPER[error as keyof typeof ERROR_MAPPER];
  return 'Непредвиденная ошибка';
};
