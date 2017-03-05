import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import Reindex from '../Reindex';
import Profile from './Profile';
import Login from './Login';
import Game from './Game';
import ProfileRoute from '../routes/ProfileRoute';

export default class App extends Component {
  state = { isLoggedIn: Reindex.isLoggedIn() };

  handleLogin = (type) => {
    Reindex.login(type).catch((error) => {
      alert(error.message);
    });
  };

  handleLogout = () => {
    Reindex.logout();
  };

  handleTokenChange = () => {
    this.setState({ isLoggedIn: Reindex.isLoggedIn() });
  };

  componentDidMount() {
    Reindex.addListener('tokenChange', this.handleTokenChange);
  }

  componentWillUnmount() {
    Reindex.removeListener('tokenChange', this.handleTokenChange);
  }

  render() {
    if (true || this.state.isLoggedIn) {
      return (
        <Relay.RootContainer
          Component={Game}
          route={new ProfileRoute}
          forceFetch={true}
          renderFetched={(data) => {
            return (
              <Game {...data} onLogout={this.handleLogout} />
            );
          }} />
      );
    } else {
      return (
        <Login onLogin={this.handleLogin} />
      );
    }
  }
}
