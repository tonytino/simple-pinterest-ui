import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import './App.css';

const Pinterest = window.PDK;
const DefaultPhotoUrl = "https://i.pinimg.com/564x/4c/6a/98/4c6a988f193b8b0a7ad488d5995c9642.jpg";
const ErrorPhotoUrl = "https://i.pinimg.com/564x/d4/8f/c2/d48fc2c152cdcac09a82f9b0d3c4ff91.jpg";

Pinterest.init({
  appId: '4988577106693740856',
  cookie: true
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      sideDrawerData: [],
      pins: [],
      boards: [],
      pinsUrls: [],
      pinsData: [],
      boardsData: [],
      activeBoardId: '',
      loadingPins: [],
    }

    this.fetchPins = this.fetchPins.bind(this);
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

  fetchPins() {
    console.log('Fetching data from Pinterest...');
    let boardPins = [];
    let boardsData = [];
    let boardPinsUrls = [];
    const boardId = '300545043822002582';

    if (!!Pinterest.getSession()) {
      Pinterest.request(
        `/boards/${boardId}/pins/`,
        { fields: 'id,link,url,creator,board,created_at,note,color,counts,media,attribution,image,metadata' },
        response => {
          console.log('Raw Response', response);
          try {
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
              boardsData = response.data;
              console.log('Your Boards Data', response.data);
            })
            console.log('testing');

            // Update the page to load the first pin (avoid rate limit)
            this.setState({
              pins: [boardPinsUrls[0]],
              pinsUrls: boardPinsUrls,
              pinsData: boardPins,
              boardsData: boardsData,
            });
          } catch(error) {
            console.error(error);
            alert("Sorry, but we might be getting rate-limited by Pinterest. See the log for more details.")
            this.setState({
              pins: [ErrorPhotoUrl]
            });
          }
        }
      );
    } else {
      this.setState({
        pins: [DefaultPhotoUrl]
      });
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

  renderPinsUrls = () => {
    const { pinsUrls } = this.state;

    if (pinsUrls.length) {
      return (
        <div className="pins-urls-pre-wrap">
          <h3>URLs for all Pins</h3>
          <pre>
            [
              {
                pinsUrls.map(url => {
                  return (
                    <div key={url}>
                      {`  ${url}`},
                    </div>
                  )
                })
              }
            ]
          </pre>
        </div>
      )
    }
  }

  renderPinsData = () => {
    const { pinsData } = this.state;

    if (pinsData.length) {
      return (
        <div className="pins-data-pre-wrap">
          <h3>Data for all Pins</h3>
          <pre>
            {JSON.stringify(pinsData, undefined, 2)}
          </pre>
        </div>
      )
    }
  }

  renderBoardsData = () => {
    const { boardsData } = this.state;

    if (boardsData.length) {
      return (
        <div className="boards-data-pre-wrap">
          <h3>Data for all your Boards</h3>
          <pre>
            {JSON.stringify(boardsData, undefined, 2)}
          </pre>
        </div>
      )
    }
  }

  render() {
    const { pins } = this.state;

    const pinsToRender = pins.length
      ? pins.map((pin, index) => this.renderPin(pin, index))
      : [this.renderPin(DefaultPhotoUrl, 0)];

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
            <h3>Most Recent Pin(s) for Board</h3>
            {pinsToRender}
            <i>May only be showing a single pin due to rate limiting.</i>
          </div>
          {this.renderPinsUrls()}
          {this.renderPinsData()}
          {this.renderBoardsData()}
        </main>

        <br>
        </br>
        <br>
        </br>
      </div>
    );
  }
}

export default App;
