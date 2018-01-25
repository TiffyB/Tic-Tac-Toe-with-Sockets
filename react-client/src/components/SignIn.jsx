import React from 'react';

const SignIn = (props) => (
  <div>
    <h2>Welcome to Tic Tac Toe!</h2>
    <h4>Sign into existing game or create a new game below:</h4>

    <label>Enter your username: </label><br/>
    <input type="text" onChange={props.updateUsername}/><br/>
    {props.invalid &&
      <div className="invalid" >Sorry, this game ID is invalid. Please double-check and re-enter.</div>
    }
  	<label>Enter existing game ID here: </label><br/>
    <input type="text" onChange={props.updateGameId} /><br/>
    <button onClick={props.enterExistingGame}>Join Existing Game</button>
    <span className="or">OR</span>
    <button onClick={props.createNewGame}>Create New Game</button>
  </div>
)

export default SignIn;