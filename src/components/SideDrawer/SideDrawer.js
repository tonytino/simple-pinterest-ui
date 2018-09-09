// Credit goes to this tutorial:
// https://www.youtube.com/watch?v=l6nmysZKHFU
import React from 'react';
import './SideDrawer.css'

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';

  if (props.show) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">
            Board Name 1
          </a>
        </li>

        <li>
          <a href="/">
            Board Name 2
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default sideDrawer;
