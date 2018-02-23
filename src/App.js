import React, { Component } from 'react';
import Player from './components/player.js';
import PlayerModel from './models/playerModel.js';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };

    for (var i = 1; i < 6; i++) {
      if (i === 1) this.state.players.push(new PlayerModel('players' + i, true));
      else this.state.players.push(new PlayerModel('players' + i, false));
    }
  }
  componentDidMount() {
    const socket = io.connect('http://localhost:8080');
    socket.on('news', function (data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Player
          name={this.state.players[0].name}
          hand={this.state.players[0].hand}
          points={this.state.players[0].points}
        />
      </div>
    );
  }
}

export default App;
