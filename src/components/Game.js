import React, {Component} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Card from './Card';

class Game extends Component {
  constructor(props) {
    super(props);

    var deck = this.createDeck();
    this.state = {
      deck: deck,
      board: _.sample(deck, 12)
    }

    console.log("BOARD", this.state.board);
  }

  createDeck() {
    const colors = ["cyan", "magenta", "yellow"];
    const numbers = [1, 2, 3];
    const shapes = ["star", "circle", "battery"];
    const fills =  ["empty", "half", "full"];

    var cards = [];
    _.each(colors, (color) => {
      _.each(numbers, (number) => {
        _.each(shapes, (shape) => {
          _.each(fills, (fill) => {
            cards.push({
              id: cards.length,
              color: color,
              number: number,
              shape: shape,
              fill: fill
            })
          })
        })
      })
    })

    return _.shuffle(cards);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.board.map((card) =>
            <div className="col s3">
              <Card color={card.color} number={card.number} shape={card.shape} fill={card.fill} />
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
