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
    this.logout = this.logout.bind(this);
    this.processLogin = this.processLogin.bind(this);
    this.processLogout = this.processLogout.bind(this);
    this.resetState = this.resetState.bind(this);
  };

  login() {
    Pinterest.login({ scope : 'read_public' }, this.props.onAuthenticate);
  };

  logout() {
    Pinterest.logout(this.processLogout);
  }

  resetState() {
    this.setState({
      loggedIn: !!Pinterest.getSession()
    })
  }

  processLogin() {
    this.props.onAuthenticate();
    this.resetState()
  }

  processLogout() {
    this.props.onAuthenticate();
    this.resetState()
  }

  render() {
    const userAuthenticated = this.state.loggedIn;

    return userAuthenticated
      ? (
        <button
          className="logout-button"
          onClick={this.logout}
        >
          Sign out
        </button>
      )
      : (
        <button
          className="login-button"
          onClick={this.login}
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
