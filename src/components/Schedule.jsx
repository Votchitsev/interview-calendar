/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 70vh;
  overflow-y: scroll;
`;

const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const HourCell = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin: 1px;
`;

const Events = styled.div`
  display: flex;
  padding-left: 10px;
  height: fit-content;
`;

const DayEvents = styled.div`
  display: flex;
  flex-direction: column;
`;

const EventCell = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid grey;
  margin: 1px; 
`;

function getHourList() {
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

function Schedule({ days, events, setActiveEvent }) {
  const hours = getHourList();

  const activeElementStyle = {
    backgroundColor: 'grey',
  };

  const onEventClickHandle = (day, hour) => {
    const eventObject = {
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear(),
      hour,
    };

    const event = events.find(
      (ev) => JSON.stringify(ev) === JSON.stringify(eventObject),
    );

    if (event) {
      setActiveEvent(eventObject);
      return;
    }

    setActiveEvent();
  };

  const checkActiveElement = (day, hour) => {
    const eventObject = {
      day: day.getDate(),
      month: day.getMonth(),
      year: day.getFullYear(),
      hour,
    };

    return events.find(
      (event) => JSON.stringify(event) === JSON.stringify(eventObject),
    );
  };

  return (
    <Container>
      <TimeColumn>
        { hours.map((hour) => <HourCell>{`${hour / 10 >= 1 ? hour : `0${hour}`}:00`}</HourCell>)}
      </TimeColumn>
      <Events>
        { days.map((day) => (
          <DayEvents key={day.getDate()}>
            { hours.map(
              (hour) => (
                <EventCell
                  key={hour}
                  style={checkActiveElement(day, hour) ? activeElementStyle : null}
                  onClick={() => onEventClickHandle(day, hour)}
                />
              ),
            ) }
          </DayEvents>
        )) }
      </Events>
    </Container>
  );
}

export default Schedule;
