import React from 'react';
import SignIn from './SignIn.jsx';

const Status = (props) => (
  <div>
  	<label className="gameId">Game ID: </label><span className="gameId">{props.gameId}</span><br/>
  	<div>
  		<label className="player">Player 1: </label>
  		<span className="info">{props.player1}</span>
  		<label className="player">Wins: </label>
  		<span className="info">{props.player1Wins}</span>
  	</div>
  	<div>
  		<label className="player">Player 2: </label>
  		<span className="info">{props.player2}</span>
  		<label className="player">Wins: </label>
  		<span className="info">{props.player2Wins}</span>
  	</div>
  </div>
)

export default Status;