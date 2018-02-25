import React from 'react';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hand: props.hand.map((card, index) => card),
      cardWithPoints: []
    };
  }

  render() {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <div>Hand: {this.state.hand}</div>
        <div>Points: {this.props.points}</div>
      </div>
    )
  }
}
