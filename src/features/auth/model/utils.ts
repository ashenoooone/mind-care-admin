const ERROR_MAPPER = {
  'Request failed with status code 409': 'Неверные данные',
};

export const mapLoginErrorToText = (error: string) => {
  if (error in ERROR_MAPPER) return ERROR_MAPPER[error];
  return 'Непредвиденная ошибка';
};
