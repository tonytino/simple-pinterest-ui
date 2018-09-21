import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

const Pinterest = window.PDK;
const DefaultPhotoUrl = "https://i.pinimg.com/564x/4c/6a/98/4c6a988f193b8b0a7ad488d5995c9642.jpg";

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
        pins: [this.renderPin(DefaultPhotoUrl, 0))]
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
      : [this.renderPin(DefaultPhotoUrl, 0))];

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
