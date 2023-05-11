import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarClass from '../Calendar';
import Day from './Day';
import Schedule from './Schedule';
import {
  CustomDate, getDateFromPrompt, weekDayNames, MonthsList,
} from '../utils';
import Storage from '../storage';
import caret from '../svg/caret.svg';

const CalendarElement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  width: fit-content;
  max-width: 740px;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
`;

const Title = styled.h1`
  padding: 10px;
  font-weight: normal;
`;

const AddEventButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 3em;
  cursor: pointer;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f0f0;
  border-top: #f5caca 2px solid;
  border-bottom: #f5caca 2px solid;
`;

const WeekDaysList = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 14.2%);
  padding: 20px 0px 20px 50px;
`;

const WeekDayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 500px) {
    width: 50px;
  }
`;

const WeekDayName = styled.div`
  font-size: 0.8em;
  text-align: center;
  padding: 4px;
`;

const MonthBar = styled.div`
  display: flex;
  width: 100%;
  align-self: center;
  justify-content: space-between;
  padding-left: 5%;
  width: 95%;
`;

const MonthYearContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5em;
`;

const MonthBtn = styled.button`
  background: none;
  border: none;
  background-image: url(${caret});
  background-size: contain;
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const MonthBtnLeft = styled(MonthBtn)`
`;

const MonthBtnRight = styled(MonthBtn)`
  transform: rotate(180deg);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  background-color: #f5f0f0;
  padding: 0 6%;
`;

const Button = styled.button`
background: none;
border: none;
font-size: 1.5em;
color: red;
cursor: pointer
`;

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

    if (!parsedDate) {
      return;
    }

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
        <AddEventButton onClick={onAddEvent}>+</AddEventButton>
      </TitleContainer>
      <TopBar>
        <WeekDaysList>
          { days.map(
            (day) => (
              <WeekDayItem key={day.getDate()}>
                <WeekDayName>{ weekDayNames[day.getDay()] }</WeekDayName>
                <Day
                  day={day}
                />
              </WeekDayItem>
            ),
          ) }
        </WeekDaysList>
        <MonthBar>
          <MonthBtnLeft onClick={() => onClick('prev')} type="button" />
          <MonthYearContainer>
            { MonthsList[month] }
            {' '}
            { year }
          </MonthYearContainer>
          <MonthBtnRight onClick={() => onClick('next')} type="button" />
        </MonthBar>
      </TopBar>
      <Schedule days={days} events={events} setActiveEvent={setActiveEvent} />
      <ButtonsContainer>
        <Button onClick={() => setCurrentDate(Date.now())}>Today</Button>
        { activeEvent ? <Button onClick={onDeleteEvent}>Delete</Button> : null }
      </ButtonsContainer>
    </CalendarElement>
  );
}

export default Calendar;
