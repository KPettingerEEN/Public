// Target.js
import React from 'react';

const Target = ({ id, top, left, size, handleClick }) => (
  <div
    className="target"
    style={{ top: `${top}%`, left: `${left}%`, width: `${size}px`, height: `${size}px` }}
    onClick={() => handleClick(id)}
  ></div>
);

export default Target;
