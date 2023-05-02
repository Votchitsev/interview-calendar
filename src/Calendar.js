class Calendar {
  constructor() {
    this.dayMilliseconds = 24*60*60*1000;
  }

  getStartWeekDay(weekDay, currentDate) {
    let startWeekDate;

    if (weekDay === 0) {
      startWeekDate = currentDate - (this.dayMilliseconds * 6)
    };
  
    if (weekDay === 1) {
      startWeekDate = currentDate;
    }
  
    if (weekDay > 1) {
      startWeekDate = currentDate - (this.dayMilliseconds * (weekDay - 1))
    };

    return startWeekDate;
  }

  getWeekDaysList(activeDate) {
    const dateInstance = new Date(activeDate);
    const weekDay = dateInstance.getDay();

    const startWeek = this.getStartWeekDay(weekDay, dateInstance);
    console.log(startWeek);
    const weekDaysList = []

    for (let i = 0; i < 7; i++) {
      let date = new Date(startWeek + (i * this.dayMilliseconds));
      weekDaysList.push(date);
    }

    return weekDaysList;
  }

  changeWeek(date, action) {
    if (action === 'next') {
      return date + (this.dayMilliseconds * 7);
    }
  
    if (action === 'prev') {
      return date - (this.dayMilliseconds * 7);
    } 
  }
}

export default Calendar;
