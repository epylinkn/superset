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
      selected: [],
      status: ''
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

        <div className="row buttons">
          <a className="btn-floating btn-large waves-effect waves-light red"
              onClick={this.addCard.bind(this)}>
            <i className="fa fa-plus fa-3x"></i>
          </a>
        </div>

        <div className="row">
          <div className={this.state.status}>
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
      </div>
    );
  }

  addCard = () => {
    this.setState((prevState) => {
      return {
        deck: prevState.deck.slice(1),
        board: prevState.board.concat(prevState.deck[0])
      }
    })
  }

  handleClick = (id) => {
    // Don't allow selecting same card
    const pos = this.state.selected.indexOf(id);
    if (pos !== -1) {
      var selected = this.state.selected;
      selected.splice(pos, 1);
      this.setState({
        selected: selected
      })
      return false;
    }

    this.setState({
      selected: this.state.selected.concat(id)
    });
  }

  componentDidUpdate() {
    console.log(this.state.selected);
    if (this.state.status == '' && this.state.selected.length >= 3) {
      var cards = this.state.board.filter((card) => { return this.state.selected.indexOf(card.id) !== -1 });
      if (this.isValidSet(cards)) {
        console.log("yep");
        var numCards = _.max([0, 3 - (this.state.board.length - 12)]);
        var nextCards = this.state.deck.slice(0, numCards);
        var nextBoard = this.state.board.map((card) => {
          if (this.state.selected.indexOf(card.id) == -1) {
            return card;
          } else {
            const nextCard = nextCards.pop();
            if (nextCard) {
              return nextCard;
            } else {
              return null;
            }
          }
        })
        var nextBoard = _.compact(nextBoard);

        this.setState({
          status: "correct"
        });

        setTimeout(() => {
          this.setState({
            selected: [],
            board: nextBoard,
            deck: this.state.deck.slice(numCards),
            status: ""
          })
        }, 1000)
      } else {
        this.setState({
          status: "wrong"
        });

        setTimeout(() => {
          console.log("nope");
          this.setState({
            selected: [],
            status: ""
          });
        }, 1000)
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
