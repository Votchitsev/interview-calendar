/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { CustomDate, getHourList } from '../utils';

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
  height: 47px;
  margin: 1px;
  position: relative;
  top: -24px;

  &:nth-child(1) {
    visibility: hidden;
  }
`;

const Events = styled.div`
  display: flex;
  padding-left: 10px;
  height: fit-content;
  width: 100%;
`;

const DayEvents = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const EventCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-right: 1px solid #f5caca;
  border-bottom: 1px solid #f5caca;
  flex-grow: 1;
  padding: 4px;
`;

const Event = styled.div`
  width: 100%;
  height: 100%;
  background-color: aqua;
`;

function Schedule({ days, events, setActiveEvent }) {
  const hours = getHourList();

  const onEventClickHandle = (day, hour) => {
    const eventObject = new CustomDate(day, hour);

    const event = events.find(
      (ev) => ev.isEqual(eventObject),
    );

    if (event) {
      setActiveEvent(eventObject);
      return;
    }

    setActiveEvent();
  };

  const checkActiveElement = (day, hour) => {
    const eventObject = new CustomDate(day, hour);

    return events.find(
      (event) => event.isEqual(eventObject),
    );
  };

  return (
    <Container>
      <TimeColumn>
        { hours.map((hour) => <HourCell key={hour}>{`${hour / 10 >= 1 ? hour : `0${hour}`}:00`}</HourCell>)}
      </TimeColumn>
      <Events>
        { days.map((day) => (
          <DayEvents key={day.getDate()}>
            { hours.map(
              (hour) => (
                <EventCell
                  key={hour}
                  onClick={() => onEventClickHandle(day, hour)}
                >
                  { checkActiveElement(day, hour) ? <Event /> : null }
                </EventCell>
              ),
            ) }
          </DayEvents>
        )) }
      </Events>
    </Container>
  );
}

export default Schedule;
