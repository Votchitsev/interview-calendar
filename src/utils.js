export class CustomDate {
  constructor(date, hour = null) {
    this.originalDate = date;
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.hour = hour || date.getHours();
  }

  get() {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
    };
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

export function getHourList() {
  const hourList = [];

  function getHour(hour) {
    if (hour < 24) {
      hourList.push(hour);
      return getHour(hour + 1);
    }

    return true;
  }

  getHour(0);

  return hourList;
}

export function getDateFromPrompt() {
  const eventTime = prompt('Enter event time:\nYYYY:MM:DD HH:mm:ss');

  if (!eventTime) {
    return false;
  }

  const date = eventTime.match(/^\d{4}:\d{2}:\d{2}/);
  const time = eventTime.match(/\d{2}:\d{2}:\d{2}$/);

  if (!date || !time) {
    alert('Please enter time with the pattern:\nYYYY:MM:DD HH:mm:ss');
    return false;
  }

  const formattedDateString = `${date[0].replace(/:/g, '-')}T${time[0]}`;

  if (!Date.parse(formattedDateString)) {
    alert('Invalid Date');
    return false;
  }

  const parsedDate = new Date(formattedDateString);

  return parsedDate;
}
