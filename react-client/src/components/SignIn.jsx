import React from 'react';

const SignIn = (props) => (
  <div>
    <h2>Welcome to Tic Tac Toe!</h2>
    <h4>Sign into an existing game or create a new game below:</h4>
  	<form>
  	Enter existing game ID here: <input type="text" value=""><button>Join Game</button><br>
  	</form>
  	<button>New Game</button>
  </div>
)

export default SignIn;