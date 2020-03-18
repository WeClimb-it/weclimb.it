import Cookies from 'js-cookie';

export default class PersistencyService {
  public static hasLocalStorage: boolean = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

  /**
   *
   */
  public static get(key: string): string | null | undefined {
    if (this.hasLocalStorage) {
      return window.localStorage.getItem(key);
    } else {
      return Cookies.get(key);
    }
  }

  /**
   *
   */
  public static set(key: string, value: string) {
    if (this.hasLocalStorage) {
      window.localStorage.setItem(key, value);
    } else {
      Cookies.set(key, value);
    }
  }
}
