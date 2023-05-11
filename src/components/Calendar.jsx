import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarClass from '../Calendar';
import Day from './Day';
import Schedule from './Schedule';
import { CustomDate, getDateFromPrompt } from '../utils';
import Storage from '../storage';

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
  const [events, setEvents] = useState(Storage.get('events') || []);
  const [activeEvent, setActiveEvent] = useState();

  const calendar = new CalendarClass();

  const onClick = (action) => {
    setCurrentDate(
      (prev) => calendar.changeWeek(prev, action),
    );
  };

  const onAddEvent = () => {
    const parsedDate = getDateFromPrompt();
    const dateObject = new CustomDate(parsedDate);
    setEvents((prev) => [...prev, dateObject]);
  };

  const onDeleteEvent = () => {
    setEvents(
      (prev) => prev.filter((ev) => !ev.isEqual(activeEvent)),
    );

    setActiveEvent();
  };

  useEffect(() => {
    Storage.set('events', events);
  }, [events]);

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
              />
            </WeekDayItem>
          ),
        ) }
      </WeekDaysList>
      <MonthBar>
        <MonthBtnLeft onClick={() => onClick('prev')} type="button" />
        <div>{ MonthsList[month] }</div>
        <div>{ year }</div>
        <MonthBtnRight onClick={() => onClick('next')} type="button" />
      </MonthBar>
      <Schedule days={days} events={events} setActiveEvent={setActiveEvent} />
      <ButtonsContainer>
        <Button onClick={() => setCurrentDate(Date.now())}>Today</Button>
        { activeEvent ? <Button onClick={onDeleteEvent}>Delete</Button> : null }
      </ButtonsContainer>
    </CalendarElement>
  );
}

export default Calendar;
