import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

const Pinterest = window.PDK;
Pinterest.init({
  appId: '4988577106693740856',
  cookie: true
});


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      pins: [],
      boards: []
    }
  }

  componentDidMount() {
    this.fetchPins();
  }

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

  fetchPins = () => {
    let boardPins = [];
    let boardPinsUrls = [];
    const boardId = '300545043822002582';

    if (!!Pinterest.getSession()) {
      Pinterest.request(
        `/boards/${boardId}/pins/`,
        { fields: 'id,link,url,creator,board,created_at,note,color,counts,media,attribution,image,metadata' },
        response => {
          // Capture all the pins we got from the request
          boardPins = boardPins.concat(response.data);

          // Check if there's more pins to pull for the board
          if (response.hasNext) {
            // This will recursively go to this same callback to get more pins
            response.next();
            return null;
          }

          // Collect all the pin urls
          if (boardPins.length) {
            boardPinsUrls = boardPins.map(pin => pin.image.original.url);
          }

          // Log all the pins we've collected
          console.log('Data for all the pins', boardPins);
          console.log('URLs for all the pins', boardPinsUrls);

          // Log boards data
          Pinterest.me('boards', response => {
            console.log(response.data)
          })

          // Update the page to load the first pin (avoid rate limit)
          this.setState({
            pins: [boardPinsUrls[0]]
          });
        }
      );
    } else {
      this.setState({
        pins: [
          "https://i.pinimg.com/564x/c3/83/3e/c3833e56c5b984cf70b23e9da9cfb6c1.jpg",
          "https://i.pinimg.com/564x/4c/6a/98/4c6a988f193b8b0a7ad488d5995c9642.jpg",
          "https://i.pinimg.com/564x/95/0b/b0/950bb0e6d71372119d8a7a6aa862c295.jpg",
          "https://i.pinimg.com/564x/f7/c6/2b/f7c62babfe968438947aa9ae11fd1c9d.jpg",
          "https://i.pinimg.com/564x/fd/ab/6d/fdab6dee09c491aabcce9f3a6c6e2c88.jpg",
          "https://i.pinimg.com/564x/d4/8f/c2/d48fc2c152cdcac09a82f9b0d3c4ff91.jpg",
          "https://i.pinimg.com/564x/2b/02/5c/2b025c4f4c3dffec981c88ff62054939.jpg",
          "https://i.pinimg.com/564x/81/c5/a9/81c5a9ddf9f28a029fc58c4e90d7de25.jpg",
          "https://i.pinimg.com/564x/b6/45/9f/b6459fe42b90004790e73d215a18f6b4.jpg",
        ]
      })
    }
  }

  renderPin = (pin, index) => {
    return (
      <div key={index} className="pin-wrap">
        <img
          src={pin}
          alt="pinterest-pin"
        />
        <br />
      </div>
    )
  }

  render() {
    const { pins } = this.state;

    const pinsToRender = pins.length
      ? pins.map((pin, index) => this.renderPin(pin, index))
      : [
        "https://i.pinimg.com/564x/c3/83/3e/c3833e56c5b984cf70b23e9da9cfb6c1.jpg",
        "https://i.pinimg.com/564x/4c/6a/98/4c6a988f193b8b0a7ad488d5995c9642.jpg",
        "https://i.pinimg.com/564x/95/0b/b0/950bb0e6d71372119d8a7a6aa862c295.jpg",
        "https://i.pinimg.com/564x/f7/c6/2b/f7c62babfe968438947aa9ae11fd1c9d.jpg",
        "https://i.pinimg.com/564x/fd/ab/6d/fdab6dee09c491aabcce9f3a6c6e2c88.jpg",
        "https://i.pinimg.com/564x/d4/8f/c2/d48fc2c152cdcac09a82f9b0d3c4ff91.jpg",
        "https://i.pinimg.com/564x/2b/02/5c/2b025c4f4c3dffec981c88ff62054939.jpg",
        "https://i.pinimg.com/564x/81/c5/a9/81c5a9ddf9f28a029fc58c4e90d7de25.jpg",
        "https://i.pinimg.com/564x/b6/45/9f/b6459fe42b90004790e73d215a18f6b4.jpg",
      ].map((pin, index) => this.renderPin(pin, index));

    return (
      <div className="App">
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
          onAuthenticate={this.fetchPins}
        />

        <SideDrawer
          show={this.state.sideDrawerOpen}
        />

        { this.renderBackdrop() }

        <main>
          <div className="pins-container">
            {pinsToRender}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
