import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
// https://github.com/balloob/react-sidebar#readme
import Sidebar from "react-sidebar";
import './App.css';

class App extends Component {

  state = {
    sideBarOpen: false
  };

  openSideBar = (open) => {
    this.setState({ sideBarOpen: open });
  };

  sideBarStyles = () => {
    return {
      sidebar: {
        background: "white",
        width: "300px",
        maxWidth: "70%",
        height: "100%",
        position: "fixed",
      }
    }
  };

  renderSideBarContent = () => {
    return (
      <nav className="side-bar__content">
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

  render() {
    return (
      <div className="App">
        <Sidebar
          sidebar={this.renderSideBarContent()}
          styles={this.sideBarStyles()}
          open={this.state.sideBarOpen}
          onSetOpen={this.openSideBar}
        >
          <Toolbar
            drawerClickHandler={this.openSideBar}
          />
        </Sidebar>

        <main>
          <p>
            Going to build an app that will be used to acquire access to the
            Pinterest API.
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            Coming soon!
          </p>
        </main>
      </div>
    );
  }
}

export default App;
