import React, {Component} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import $ from 'jQuery';

class Card extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col s3">
        <div className={`card card-${ this.props.color } ${ this.props.selected ? "selected" : "" }`} onClick={this.handleClick}>
          {_.times(this.props.number, (i) =>
            <i key={i} className={`fa ${ this.iconFor(this.props.shape, this.props.fill) } fa-5x`}></i>
          )}
        </div>
      </div>
    );
  }

  handleClick = (event) => {
    this.props.handleClickCb(this.props.id);
  }

  iconFor = (shape, fill) => {
    if (shape == "battery") {
      return {
        "empty": "fa-battery-empty",
        "half": "fa-battery-half",
        "full": "fa-battery-full"
      }[fill];
    } else if (shape == "star") {
      return {
        "empty": "fa-star-o",
        "half": "fa-star-half-o",
        "full": "fa-star"
      }[fill];
    } else {
      return {
        "empty": "fa-circle-o",
        "half": "fa-dot-circle-o",
        "full": "fa-circle"
      }[fill];
    }
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
