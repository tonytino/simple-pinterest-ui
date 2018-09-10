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

      <div className="side-drawer__footer">
        <div className="side-drawer__footer__content">
          Concept and Data Science by:
          <a
            className="contributor"
            href="https://github.com/AubreyB13"
            target="_blank"
          >
            Aubrey Browne
          </a>

          <br />

          Web Development by:
          <a
            className="contributor"
            href="https://github.com/tonytino"
            target="_blank"
          >
            Anthony Hernandez
          </a>
        </div>
      </div>
    </nav>
  );
};

export default sideDrawer;
