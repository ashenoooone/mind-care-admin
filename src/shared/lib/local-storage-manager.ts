export type TLocalStorageManagerKeys = 'token';

export class LocalStorageManager {
  static getItem = <T>(
    key: TLocalStorageManagerKeys
  ): T | null => {
    const result = localStorage.getItem(key);
    if (result) {
      return JSON.parse(result) as T;
    }
    return null;
  };

  static setItem = (
    key: TLocalStorageManagerKeys,
    value: unknown
  ): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };
}
