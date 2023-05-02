import React, { useEffect, useState } from 'react';
import CalendarClass from '../Calendar';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState();

  const calendar = new CalendarClass();

  const onClick = (action) => {
    setCurrentDate(
      (prev) => calendar.changeWeek(prev, action),
    );
  };

  useEffect(() => {
    setDays(
      calendar.getWeekDaysList(currentDate),
    );

    setMonth(() => {
      const date = new Date(currentDate);
      return date.getMonth();
    });
  }, [currentDate]);

  return (
    <>
      { days.map((day) => <div>{ day.getDate() }</div>) }
      <div>{ currentDate }</div>
      <div>{ month }</div>
      <button onClick={() => onClick('prev')} type="button">Пред.</button>
      <button onClick={() => onClick('next')} type="button">След.</button>
    </>
  );
}

export default Calendar;
