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
    Pinterest.login({ scope : 'read_public' }, this.processLogin);
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
    this.resetState();
  }

  render() {
    const userAuthenticated = this.state.loggedIn;

    return userAuthenticated
      ? (
        <button
          className="logout-button"
          onClick={this.logout}
        >
          Log out
        </button>
      )
      : (
        <button
          className="login-button"
          onClick={this.login}
        >
          Log in
        </button>
      );
  }
}


const Authenticate = (props) => (
  <div className="user-session-controls">
    <UserSessionControls onAuthenticate={props.onAuthenticate} />
  </div>
);

export default Authenticate;
