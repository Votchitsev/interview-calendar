/* eslint-disable react/prop-types */
import React from 'react';

function Day({ day, onSetActiveDay, active }) {
  const activeStyle = {
    backgroundColor: 'orange',
  };

  return (
    <button
      type="button"
      style={active ? activeStyle : null}
      onClick={() => onSetActiveDay(day)}
    >
      { day.getDate() }
    </button>
  );
}

export default Day;
