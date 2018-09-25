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
        {
          props.boards.map((board, index) => {
            return (
              <li key={index}>
                <a
                  onClick={() => {
                    props.setAsActiveBoardId(board.id);
                  }}
                >
                  {board.name}
                </a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
};

export default sideDrawer;
