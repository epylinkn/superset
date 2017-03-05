import React, {Component} from 'react';
import Relay from 'react-relay';
import _ from 'lodash';
import Card from './Card';

class Game extends Component {
  constructor(props) {
    super(props);

    var deck = this.createDeck();
    this.state = {
      deck: _.takeRight(deck, 81-12),
      board: _.take(deck, 12),
      selected: []
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
        <div>
          <h1 style={{textAlign: "center"}}>{this.state.deck.length} cards remaining</h1>
        </div>

        <div className="row">
          {this.state.board.map((card, i) =>
            <Card key={i}
              id={card.id}
              handleClickCb={this.handleClick}
              selected={this.state.selected.indexOf(card.id) !== -1}
              color={card.color}
              number={card.number}
              shape={card.shape}
              fill={card.fill} />
          )}
        </div>
      </div>
    );
  }

  handleClick = (id) => {
    this.setState({
      selected: this.state.selected.concat(id)
    });
  }

  componentDidUpdate() {
    console.log(this.state.selected);
    if (this.state.selected.length >= 3) {
      var cards = this.state.board.filter((card) => { return this.state.selected.indexOf(card.id) !== -1 });
      if (this.isValidSet(cards)) {
        console.log("yep");
        var nextCards = this.state.deck.slice(0, 3);
        var nextBoard = this.state.board.map((card) => {
          if (this.state.selected.indexOf(card.id) == -1) {
            return card;
          } else {
            return nextCards.pop();
          }
        })
        this.setState({
          selected: [],
          board: nextBoard,
          deck: this.state.deck.slice(3)
        })
      } else {
        console.log("nope");
        this.setState({
          selected: [],
        });
      }
    }
  }

  isValidSet = (cards) => {
    return _.all([
      _.uniq(_.map(cards, "color")),
      _.uniq(_.map(cards, "number")),
      _.uniq(_.map(cards, "shape")),
      _.uniq(_.map(cards, "fill"))
    ], (attrs) => {
      return attrs.length == 1 || attrs.length == 3;
    })
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
