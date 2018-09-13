// Credit goes to this tutorial:
// https://www.youtube.com/watch?v=l6nmysZKHFU
import React from 'react';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import Authenticate from '../Authenticate/Authenticate.js';
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
          Perfect Wedding
        </a>
      </div>

      <div className="spacer"></div>

      <div className="toolbar__navigation-items">
        <ul>
          <li>
            <Authenticate
              onAuthenticate={props.onAuthenticate}
            />
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

export default Toolbar;
