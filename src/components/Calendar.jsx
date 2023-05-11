import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarClass from '../Calendar';
import Day from './Day';
import Schedule from './Schedule';

const CalendarElement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50vh auto;
  height: fit-content;
  width: fit-content;
  max-width: 740px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  padding: 10px;
`;

const AddEventButton = styled.button`
  background-color: green;
  height: 40px;
`;

const WeekDaysList = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
`;

const WeekDayItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthBar = styled.div`
  display: flex;
  width: 100%;
  align-self: center;
  justify-content: space-between;
  padding-left: 50px;
`;

const MonthBtn = styled.button`
  background: none;
  display: inline-block;
  border: 10px solid transparent;
  cursor: pointer;
`;

const MonthBtnLeft = styled(MonthBtn)`
  border-right: 10px solid orange;
`;

const MonthBtnRight = styled(MonthBtn)`
  border-left: 10px solid orange;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
background: none;
border: none;
color: red;
cursor: pointer
`;

const weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MonthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(Date.now());
  const [days, setDays] = useState([]);
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [activeDay, setActiveDay] = useState();
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState();

  const calendar = new CalendarClass();

  const onClick = (action) => {
    setCurrentDate(
      (prev) => calendar.changeWeek(prev, action),
    );
  };

  const onAddEvent = () => {
    const eventTime = prompt('Enter event time:\nYYYY:MM:DD HH:mm:ss');

    if (!eventTime) {
      return;
    }

    const date = eventTime.match(/^\d{4}:\d{2}:\d{2}/);
    const time = eventTime.match(/\d{2}:\d{2}:\d{2}$/);

    if (!date || !time) {
      alert('Please enter time with the pattern:\nYYYY:MM:DD HH:mm:ss');
      return;
    }

    const formattedDateString = `${date[0].replace(/:/g, '-')}T${time[0]}`;

    if (!Date.parse(formattedDateString)) {
      alert('Invalid Date');
    }

    const parsedDate = new Date(formattedDateString);

    const dateObject = {
      day: parsedDate.getDate(),
      month: parsedDate.getMonth(),
      year: parsedDate.getFullYear(),
      hour: parsedDate.getHours(),
    };

    setEvents((prev) => [...prev, dateObject]);
  };

  const onDeleteEvent = () => {
    setEvents(
      (prev) => prev.filter((ev) => JSON.stringify(ev) !== JSON.stringify(activeEvent)),
    );

    setActiveEvent();
  };

  const onSetActiveDay = (day) => {
    setActiveDay(day);
  };

  useEffect(() => {
    setDays(
      calendar.getWeekDaysList(currentDate),
    );

    setMonth(() => {
      const date = new Date(currentDate);
      return date.getMonth();
    });

    setYear(() => {
      const date = new Date(currentDate);
      return date.getFullYear();
    });
  }, [currentDate]);

  return (
    <CalendarElement>
      <TitleContainer>
        <Title>Interview Calendar</Title>
        <AddEventButton onClick={onAddEvent}>Add</AddEventButton>
      </TitleContainer>
      <WeekDaysList>
        { days.map(
          (day) => (
            <WeekDayItem key={day.getDate()}>
              <div>{ weekDayNames[day.getDay()] }</div>
              <Day
                day={day}
                onSetActiveDay={onSetActiveDay}
                active={day === activeDay}
              />
            </WeekDayItem>
          ),
        ) }
      </WeekDaysList>
      <MonthBar>
        <MonthBtnLeft onClick={() => onClick('prev')} type="button" />
        <div>{ MonthsList[month] }</div>
        <div>{ year }</div>
        <MonthBtnRight onClick={() => onClick('prev')} type="button" />
      </MonthBar>
      <Schedule days={days} events={events} setActiveEvent={setActiveEvent} />
      <ButtonsContainer>
        <Button>Today</Button>
        { activeEvent ? <Button onClick={onDeleteEvent}>Delete</Button> : null }
      </ButtonsContainer>
    </CalendarElement>
  );
}

export default Calendar;
