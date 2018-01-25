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
    this.enterExistingGame = this.enterExistingGame.bind(this)
    this.handleMove = this.handleMove.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updateGameId = this.updateGameId.bind(this)
    this.state = { 
      gameId: null,
      gameStatus: null,
      turn: null,
      invalid: false, 
      player1: "",
      player2: "",
      username: null,
      view: "sign in",
    }

    socket.on('game', (player1, player2, gameId, status, turn) => {
      this.setState({
        gameId: gameId,
        gameStatus: status,
        player1: player1,
        player2: player2,
        turn: turn,
        view: "game"
      })
    })

    socket.on('status', (gameStatus) => {
      this.setState({
        gameStatus: gameStatus
      })
    })

    socket.on('invalid', (msg) => {
      this.setState({
        invalid: true
      })
    })

    socket.on('move', (move) => {
      this.setState({
        invalid: false
      })

    })
    
  }

  componentDidMount() {

  }
 
  handleMove(e) {
    this.setState({
      invalid: false
    })
    var symbol = this.state.username === this.state.player1 ? "X" : "O"; //handle identical usernames?
    if (this.state.gameStatus === "ready" && this.state.turn === this.state.username) {
      let box = e.target
      var row = $(box).parent().attr('class')
      var col = $(e.target).attr('class')
      console.log(row, col)
      socket.emit('move', this.state.gameId, symbol, `${row}${col}`)
    } else {
      this.setState({
        invalid: true
      })
    }

  }

  createNewGame() { 
    socket.emit('newGame', this.state.username);
  }

  enterExistingGame() {
    socket.emit('joinGame', [this.state.gameId, this.state.username])
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  updateGameId(e) { //REFACTOR LATER WITH ABOVE FUNCTION
    console.log('game id', e.target.value)
    this.setState({
      gameId: e.target.value,
      invalid: false
    })
  }

  render () {
    return (
    <div>
      {this.state.view === "sign in"
        ? <SignIn invalid={this.state.invalid} updateUsername={this.updateUsername} updateGameId={this.updateGameId} createNewGame={this.createNewGame} enterExistingGame={this.enterExistingGame}/>
        : <div>
            <h1>Tic Tac Toe</h1>
            <Status player1={this.state.player1} player2={this.state.player2} gameId={this.state.gameId}/>
            <Board invalid={this.state.invalid} gameStatus={this.state.gameStatus} handleMove={this.handleMove.bind(this)}/>
          </div>
      }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));