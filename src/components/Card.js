import React, {Component} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';

class Card extends Component {

  render() {
    return (
      <div className="card">
        {_.times(_.random(2)+1, (i) =>
          <i className="fa fa-battery-empty fa-5x" aria-hidden="true"></i>
        )}
      </div>
    );
  }
}

export default Relay.createContainer(Card, {
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
//
// color
// number
// shape
// shading
//
//
//
// battery
// star
