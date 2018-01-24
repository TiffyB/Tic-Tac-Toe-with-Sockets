import React from 'react';
import SignIn from './SignIn.jsx';

const Status = (props) => (
  <div>
    <span className="player1">Player 1:</span><span className="player1">{props.player1}</span><br/>
    <span className="player2">Player 2:</span><span className="player2">{props.player2}</span>
  </div>
)

export default Status;