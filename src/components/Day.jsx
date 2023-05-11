/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { CustomDate } from '../utils';

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
    <button
      type="button"
      style={active ? activeStyle : null}
    >
      { day.getDate() }
    </button>
  );
}

export default Day;
