import React, {Component} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Card from './Card';

class Game extends Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          {_.times(12, (i) =>
            <div className="col s3">
              <Card />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Game, {
  fragments: {
    // viewer: () => Relay.QL`
    //   fragment on ReindexViewer {
    //     user {
    //       id,
    //       credentials {
    //         facebook {
    //           displayName
    //         }
    //       }
    //     }
    //   }
    // `
  }
});
