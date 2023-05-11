export default class CustomDateObject {
  constructor(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.hour = date.getHours();
  }

  toJSON() {
    const dateObject = {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
    };

    return JSON.stringify(dateObject);
  }

  isEqual(date2) {
    return this.toJSON() === date2.toJSON();
  }
}
