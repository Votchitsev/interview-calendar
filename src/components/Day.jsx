/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import CustomDateObject from '../utils';

function Day({ day }) {
  const activeStyle = {
    backgroundColor: 'orange',
  };

  const [active, setActive] = useState(false);

  useEffect(() => {
    const date = new CustomDateObject(day);
    const today = new CustomDateObject(new Date());

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
