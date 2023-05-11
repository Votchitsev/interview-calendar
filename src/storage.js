import { CustomDate } from './utils';

export default class Storage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key)).map(
      (item) => {
        const date = new Date(item);
        return new CustomDate(date);
      },
    );
  }

  static set(key, data) {
    return localStorage.setItem(key, JSON.stringify(data.map((item) => item.originalDate)));
  }
}
