export type TLocalStorageManagerKeys =
  | 'token'
  | 'sidebar-open';

export class LocalStorageManager {
  static getItem = <T>(
    key: TLocalStorageManagerKeys
  ): T | null => {
    if (typeof window === 'undefined') return null;
    const result = localStorage?.getItem(key);
    if (result) {
      return JSON.parse(result) as T;
    }
    return null;
  };

  static setItem = (
    key: TLocalStorageManagerKeys,
    value: unknown
  ): void => {
    if (typeof window === 'undefined') return;
    localStorage?.setItem(key, JSON.stringify(value));
  };
}
