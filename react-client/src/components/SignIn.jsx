import React from 'react';

const SignIn = (props) => (
  <div>
    <h2>Welcome to Tic Tac Toe!</h2>
    <h4>Sign into an existing game or create a new game below:</h4>

    Enter your username: <input type="text" onChange={props.updateUsername}/><br/>
    {props.invalid &&
      <div className="invalid" >Sorry, this game ID is invalid. Please double-check and re-enter.</div>
    }
  	Enter existing game ID here: <input type="text" onChange={props.updateGameId} /><button onClick={props.enterExistingGame}>Join Existing Game</button>
    <span>OR</span>
    <button onClick={props.createNewGame}>Create New Game</button>
  </div>
)

export default SignIn;