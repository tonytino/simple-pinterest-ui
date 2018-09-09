// Credit goes to this tutorial:
// https://www.youtube.com/watch?v=l6nmysZKHFU
import React from 'react';
import './Backdrop.css';

const backdrop = props => (

  <div
    className="backdrop"
    onClick={props.click}
  />
);

export default backdrop;
