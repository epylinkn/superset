import React, {Component} from 'react';
import Relay from 'react-relay';
import Game from './Game';

class Profile extends Component {
  handleLogout = () => {
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  }

  getActiveCredential() {
    const credentials = this.props.viewer.user.credentials;
    for (const provider of ['facebook']) {
      if (credentials[provider]) {
        return {
          type: provider,
          displayName: credentials[provider].displayName
        };
      }
    }
  }

  render() {
    const credentials = this.getActiveCredential();
    return (
      <div>
        <h1>Welcome to Reindex!</h1>
        <div>
          You are user {credentials.displayName}
        </div>
        <div>
          Your Reindex ID is {this.props.viewer.user.id}
        </div>
        <div>You are logged in with {credentials.type}</div>
        <div>
          <button onClick={this.handleLogout}>
            Logout
          </button>
        </div>

        <Game />
      </div>
    );
  }
}

export default Relay.createContainer(Profile, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on ReindexViewer {
        user {
          id,
          credentials {
            facebook {
              displayName
            }
          }
        }
      }
    `
  }
});
