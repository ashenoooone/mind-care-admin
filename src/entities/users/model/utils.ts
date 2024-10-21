import { TClient } from './types';

export const getUserFio = (user: TClient) => {
  return `${user.last_name} ${user.first_name} ${user.middle_name}`;
};
