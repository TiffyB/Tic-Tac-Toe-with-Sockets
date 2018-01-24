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
      player1: "",
      player2: "",
      gameId: null,
      username: null,
      view: "sign in",
    }
    socket.on('newGame', (player1, player2, gameId) => {
      // console.log('got it', player1, player2)
      this.setState({
        player1: player1,
        player2: player2
      })
    })

    // socket.on()
  }

  componentDidMount() {

  }
 
  handleMove(e) {
    let box = e.target
    var row = $(box).parent().attr('class')
    var col = $(e.target).attr('class')
    console.log(row, col)
    socket.emit('move', `${row}${col}`)

  }

  createNewGame() { 
    socket.emit('newGame', this.state.username);
    // this.setState({
    //   view: "game"
    // })
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
      gameId: e.target.value
    })
  }

  render () {
    return (
    <div>
      {this.state.view === "sign in"
        ? <SignIn updateUsername={this.updateUsername} updateGameId={this.updateGameId} createNewGame={this.createNewGame} enterExistingGame={this.enterExistingGame}/>
        : <div>
            <h1>Tic Tac Toe</h1>
            <Status player1={this.state.player1} player2={this.state.player2} gameId={this.state.gameId}/>
            <Board handleMove={this.handleMove.bind(this)}/>
          </div>
      }
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));