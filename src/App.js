import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

class App extends Component {

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      // We prevent async/batch update issues by using prevState as a arg
      // instead of just doing something like:
      // this.setState({ sideDrawerOpen: !this.state.sideDrawerOpen });
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    })
  };

  backdropClickHandler = () => {
    // No need to worry about async/batch updates issue since clicking backdrop
    // should always result in a closed drawer (regardless if it's open or not)
    // If we introduce other components, like a modal, that would depend on this
    // functionality, we would simply also set their states to "closed" here too
    this.setState({ sideDrawerOpen: false });
  }

  renderBackdrop = () => {
    // Can also be based on other conditions, like a modal being open
    if (this.state.sideDrawerOpen) {
      return (
        <Backdrop
          click={this.backdropClickHandler}
        />
      );
    };
  };

  render() {
    return (
      <div className="App">
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
        />

        <SideDrawer
          show={this.state.sideDrawerOpen}
        />

        { this.renderBackdrop() }

        <main>
          <p>
            <br />
            Building an app that will be used to acquire access to the
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
