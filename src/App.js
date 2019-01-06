import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
      pins: [],
      pinsUrls: [],
      pinsData: [],
      boardsData: [],
      activeBoardId: '300545043822002582',
      loadingData: false,
    }

    this.fetchPins = this.fetchPins.bind(this);
    this.processLogout = this.processLogout.bind(this);
  };

  componentDidMount() {
    this.fetchPins();
  };

  processLogout() {
    this.setState({
      pins: [],
      pinsUrls: [],
      pinsData: [],
      boardsData: [],
      activeBoardId: '300545043822002582'
    })
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
  };

  setAsActiveBoardId = (boardId) => {
    this.setState({
      activeBoardId: boardId,
      sideDrawerOpen: false
    });
    this.fetchPins(boardId);
  };

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

  fetchPins(boardId) {
    this.setState({ loadingData: true })

    const { activeBoardId } = this.state;
    const desiredBoardId = boardId ? boardId : activeBoardId;

    let boardPins = [];
    let boardsData = [];
    let boardPinsUrls = [];

    if (!!Pinterest.getSession()) {
      console.log('Fetching data from Pinterest...');
      Pinterest.request(`/boards/${desiredBoardId}/pins/`,
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
            Pinterest.me('boards',
              { fields: 'id,name,url,description,creator,created_at,counts,image' },
              response => {
              boardsData = response.data;
              console.log('Your Boards Data', response.data);
              this.setState({ boardsData: boardsData });
            })

            // Update the page to load the first pin (avoid rate limit)
            this.setState({
              pins: boardPinsUrls.slice(0,3),
              pinsUrls: boardPinsUrls,
              pinsData: boardPins,
              loadingData: false
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
        pins: [DefaultPhotoUrl],
        loadingData: false
      });
    }
  };

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
  };

  renderPinsUrls = () => {
    const { pinsUrls } = this.state;
    const jsonData = JSON.stringify(pinsUrls, undefined, 2);

    if (pinsUrls.length) {
      return (
        <div>
          <h3>URLs for all Pins</h3>
          <CopyToClipboard text={jsonData}>
            <div className="pins-urls-pre-wrap">
              <button className="copy-to-clipboard">
                Copy to Clipboard
              </button>
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
          </CopyToClipboard>
        </div>
      )
    }
  };

  renderPinsData = () => {
    const { pinsData } = this.state;
    const jsonData = JSON.stringify(pinsData, undefined, 2);

    if (pinsData.length) {
      return (
        <div>
          <h3>Data for all Pins</h3>
          <CopyToClipboard text={jsonData}>
            <div className="pins-data-pre-wrap">
              <button className="copy-to-clipboard">
                Copy to Clipboard
              </button>
              <pre>
                {jsonData}
              </pre>
            </div>
          </CopyToClipboard>
        </div>
      )
    }
  };

  renderBoardsData = () => {
    const { boardsData } = this.state;
    const jsonData = JSON.stringify(boardsData, undefined, 2);

    if (boardsData.length) {
      return (
        <div>
          <h3>Data for all your Boards</h3>
          <CopyToClipboard text={jsonData}>
            <div className="boards-data-pre-wrap">
              <button className="copy-to-clipboard">
                Copy to Clipboard
              </button>
              <pre>
                {jsonData}
              </pre>
            </div>
          </CopyToClipboard>
        </div>
      )
    }
  };

  render() {
    const { boardsData, pins, loadingData } = this.state;

    const pinsToRender = pins.length
      ? pins.map((pin, index) => this.renderPin(pin, index))
      : [this.renderPin(DefaultPhotoUrl, 0)];

    return (
      <div className="App">
        <Toolbar
          drawerClickHandler={this.drawerToggleClickHandler}
          onAuthenticate={this.fetchPins}
          onLogout={this.processLogout}
        />

        <SideDrawer
          setAsActiveBoardId={this.setAsActiveBoardId}
          boards={boardsData}
          show={this.state.sideDrawerOpen}
        />

        { this.renderBackdrop() }

        {
          loadingData
          ? (
            <main>
              <div className="loading-screen">
                <div className="loader"></div>
              </div>
            </main>
          )
          : (
            <main>
              <div className="pins-container">
                {
                  boardsData.length
                    ? (<h3>Most Recent Pins for Board</h3>)
                    : (<h3>Log in to get started!</h3>)
                }
                {pinsToRender}
              </div>
              {this.renderPinsUrls()}
              {this.renderPinsData()}
              {this.renderBoardsData()}
            </main>
          )
        }

        <br>
        </br>
        <br>
        </br>
      </div>
    );
  };
}

export default App;
