import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client'
import Board from './components/Board.jsx';
import Status from './components/Status.jsx';

let socket = io();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      player1: "",
      player2: "waiting for player 2",
      gameId: null,
      username: window.location.search.split('=')[1],
    }
    socket.on('players', (player1, player2) => {
      console.log('got it', player1, player2)
      this.setState({
        player1: player1,
        player2: player2
      })
    })

    // socket.on()
  }

  componentDidMount() {
    socket.emit('username', this.state.username);

    // let signinObj = {
    //   username: this.state.username
    // }
    // console.log(signinObj);
    // $.ajax({
    //   url: '/signin',
    //   data: JSON.stringify(signinObj),
    //   contentType: 'application/json',
    //   type: 'POST',
    //   success: (data) => {
    //     console.log('response: ', data)
    //     this.setState({
    //       player1: data.player1,
    //       player2: data.player2,
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }
 
  handleMove(e) {
    let box = e.target
    var row = $(box).parent().attr('class')
    var col = $(e.target).attr('class')
    console.log(row, col)
    socket.emit('move', `${row} ${col}`)

  }

  render () {
    return (<div>
      <h1>Tic Tac Toe</h1>
      <Status player1={this.state.player1} player2={this.state.player2} gameId={this.state.gameId}/>
      <Board handleMove={this.handleMove.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));