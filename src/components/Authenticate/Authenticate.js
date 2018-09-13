import React from "react";
import './Authenticate.css';

const Pinterest = window.PDK;

class UserSessionControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!Pinterest.getSession()
    };

    this.login = this.login.bind(this);
    this.resetState = this.resetState.bind(this);
  };

  login() {
    Pinterest.login({ scope : 'read_public' }, this.props.onAuthenticate());
  };

  resetState() {
    this.setState({
      loggedIn: !!Pinterest.getSession()
    })
  }

  render() {
    const userAuthenticated = this.state.loggedIn;

    return userAuthenticated
      ? (
        <button
          className="logout-button"
          onClick={() => {
            Pinterest.logout(this.props.onAuthenticate());
          }}
        >
          Sign out
        </button>
      )
      : (
        <button
          className="login-button"
          onClick={() => {
            this.login()
          }}
        >
          Log In
        </button>
      );
  }
}


const Authenticate = () => (
  <div className="user-session-controls">
    <UserSessionControls />
  </div>
);

export default Authenticate;
