// Credit goes to this tutorial:
// https://www.youtube.com/watch?v=l6nmysZKHFU
import React from 'react';
import './Toolbar.css'

const Toolbar = props => (

  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div>
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
      </div>
    </nav>
  </header>
);

export default Toolbar;
