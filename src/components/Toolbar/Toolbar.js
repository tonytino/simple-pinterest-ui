// Credit goes to this tutorial:
// https://www.youtube.com/watch?v=l6nmysZKHFU
import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css'

const Toolbar = props => (

  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton
          click={props.drawerClickHandler}
        />
      </div>

      <div className="toolbar__logo">
        <a href="/">
          Simple Pinterest UI
        </a>
      </div>

      <div className="spacer"></div>

      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <a href="/">Board Name 1</a>
          </li>

          <li>
            <a href="/">Board Name 2</a>
          </li>

          <li>
            <a href="/">Board Name 3</a>
          </li>

          <li>
            <a href="/">Board Name 4</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
