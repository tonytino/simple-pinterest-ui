import React from "react";
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import './Authenticate.css';

const Pinterest = window.PDK;

class UserSessionControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };

    this.login = this.login.bind(this);
    this.resetState = this.resetState.bind(this);
  };

  login() {
    Pinterest.login({ scope : 'read_public' }, this.resetState);
    this.props.onAuthenticate();
  };

  resetState() {
    this.setState({
      loggedIn: !!Pinterest.getSession()
    })
  }

  render() {
    const userAuthenticated = this.state.loggedIn;

    return userAuthenticated
      ? <LogoutButton />
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

// Renders logout button when user logged in
const LogoutButton = withRouter(({ history }) =>
  <button
    className="logout-button"
    onClick={() => {
      Pinterest.logout(this.resetState);
    }}
  >
    Sign out
  </button>
);

const Authenticate = () => (
  <BrowserRouter>
    <div className="user-session-controls">
      <UserSessionControls />
    </div>
  </BrowserRouter>
);

export default Authenticate;
