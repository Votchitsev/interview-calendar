/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CustomDate } from '../utils';

const DayItem = styled.div`
  padding: 20px;
  border-radius: 50%;
  margin-top: 10px;
  font-size: 1.5em;
  text-align: center;
  max-width: 34px;

  @media (max-width: 500px) {
    padding: 12px;
    font-size: 1em;
  }
`;

function Day({ day }) {
  const activeStyle = {
    backgroundColor: 'orange',
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    const date = new CustomDate(day);
    const today = new CustomDate(new Date());

    if (date.isEqual(today)) {
      setActive(true);
    }
  }, []);

  return (
    <DayItem
      type="button"
      style={active ? activeStyle : null}
    >
      { day.getDate() }
    </DayItem>
  );
}

export default Day;
