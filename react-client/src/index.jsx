import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client'
import Board from './components/Board.jsx';
import SignIn from './components/SignIn.jsx';
import Status from './components/Status.jsx';

let socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.createNewGame = this.createNewGame.bind(this);
    this.enterExistingGame = this.enterExistingGame.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.updateGameId = this.updateGameId.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.state = { 
      gameId: null,
      gameStatus: null,
      invalid: false,
      origGameId: null,
      player1: "",
      player1Wins: 0,
      player2: "",
      player2Wins: 0,
      turn: null,
      username: null,
      view: "sign in",
      //board locations
      top_left: "",
      top_mid: "",
      top_right: "",
      mid_left: "",
      mid_mid: "",
      mid_right: "",
      bottom_left: "",
      bottom_mid: "",
      bottom_right: ""
    }

    socket.on('game', (player1, player2, gameId, status) => {
      this.setState({
        gameId: gameId,
        gameStatus: status,
        origGameId: gameId,
        player1: player1,
        player2: player2,
        turn: player1,
        view: "game"
      })
    })

    socket.on('reset', (gameId) => {
      this.setState({
        gameId: gameId,
        gameStatus: "ready",
        invalid: false,
        top_left: "",
        top_mid: "",
        top_right: "",
        mid_left: "",
        mid_mid: "",
        mid_right: "",
        bottom_left: "",
        bottom_mid: "",
        bottom_right: ""
      })
    })

    socket.on('invalid', (msg) => {
      this.setState({
        invalid: true
      })
    })

    socket.on('updateBoard', (symbol, move, gameStatus, username) => {
      let player1Wins = this.state.player1Wins;
      let player2Wins = this.state.player2Wins;
      if (gameStatus === "Game won!") {
        if (username === this.state.player1) {
          player1Wins++
        } else {
          player2Wins++
        }
      }

      this.setState({
        gameStatus: gameStatus,
        invalid: false,
        player1Wins: player1Wins,
        player2Wins: player2Wins,
        turn: this.state.turn === this.state.player1 ? this.state.player2 : this.state.player1,
        [`${move}`]: symbol
      })

    })
    
  }

  createNewGame() { 
    socket.emit('newGame', this.state.username);
  }

  enterExistingGame() {
    socket.emit('joinGame', this.state.gameId, this.state.username)
  }

  handleMove(e) {
    this.setState({
      invalid: false
    })
    var symbol = this.state.username === this.state.player1 ? "X" : "O"; //handle identical usernames?
    if (this.state.gameStatus === "ready" && this.state.turn === this.state.username) {
      var move = $(e.target).attr('class')
      socket.emit('move', this.state.gameId, symbol, move, this.state.username, this.state.origGameId)
    } else {
      this.setState({
        invalid: true
      })
    }
  }

  resetGame() {
    socket.emit('resetGame', this.state.player1, this.state.player2, this.state.origGameId)
  }

  updateGameId(e) {
    this.setState({
      gameId: e.target.value,
      invalid: false
    })
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  render () {
    return (
    <div>
      {this.state.view === "sign in"
        ? <SignIn 
            createNewGame={this.createNewGame} 
            enterExistingGame={this.enterExistingGame} 
            invalid={this.state.invalid} 
            updateGameId={this.updateGameId} 
            updateUsername={this.updateUsername} 
          />
        : <div>
            <h1>Tic Tac Toe</h1>
            <Status 
              gameId={this.state.origGameId}
              player1={this.state.player1}
              player1Wins={this.state.player1Wins}
              player2={this.state.player2} 
              player2Wins={this.state.player2Wins}
            />
            <Board 
              gameStatus={this.state.gameStatus} 
              handleMove={this.handleMove}
              invalid={this.state.invalid} 
              resetGame={this.resetGame}
              top_left={this.state.top_left}
              top_mid={this.state.top_mid}
              top_right={this.state.top_right}
              mid_left={this.state.mid_left}
              mid_mid={this.state.mid_mid}
              mid_right={this.state.mid_right}
              bottom_left={this.state.bottom_left}
              bottom_mid={this.state.bottom_mid}
              bottom_right={this.state.bottom_right}
            />
          </div>
      }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));