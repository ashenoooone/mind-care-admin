import Cookies from 'js-cookie';

const INFINITY_COOKIE_TIME = 1000 * 60 * 60 * 24 * 365;

export class CookieManager {
  static getItem<T>(key: string) {
    return JSON.parse(Cookies.get(key) ?? '{}') as T;
  }

  static setItem<T>(key: string, value: T) {
    Cookies.set(key, JSON.stringify(value), {
      expires: INFINITY_COOKIE_TIME,
    });
  }

  static removeItem(key: string) {
    Cookies.remove(key);
  }
}
