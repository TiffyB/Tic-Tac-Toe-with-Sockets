# Invitae Coding Challenge

## Problem Description
Create a web application that allows two users to play tic-tac-toe. Use a duplex communication channel such as websockets so that player moves are broadcast to their opponent. The application should allow two users to "sign-in" and play against each other. Assignment of which player is 'X' vs 'O' can be arbitrary. The application should track moves and the state of the board until a player wins. Invalid moves and out of turn moves should not be allowed. 


## Usage

### Global Dependencies:
- MySQL v5.7 
- Node (v6.4.0 or later)
- Webpack (v2.2.1 or later)

### Start up:
- On the command line, perform the following from the project’s root directory:
	- “mysql.server start” (starts mysql server)
    - “mysql -u root < database-mysql/schema.sql” (creates database "tictactoe" under user “root” with no password)
    - “npm install” (installs node module dependencies)
	- "npm run react-dev" (use separate tab)
	- "npm run server-dev" (use separate tab)
	- In the browser, navigate to “localhost:3000”. A second player can join at "localhost:3000".

### How to Play:
- New Game: Enter a username and click "Create New Game".
- Join Game: Enter a username and Game ID and click "Join Existing Game"
- Click on a square to make a move.

## My Solution:

###Technologies:

For the server, I used Node and Express. Because TicTacToe isn’t a very CPU intensive game, Node is a great choice since it would be able to handle many concurrent games. On the client side, I used React to quickly handle game updates without reloading the page. Redux was not used, in this case, since there weren’t enough state variables to justify needing it. Because React is written in ES6 and JSX, I used Webpack to bundle and transpile files. To store game data, I used a relational database with primary keys placed on queried columns to ensure the database was scalable. Socket.io was used to handle all communication between the client and the server. 

###Coding Style:

I wrote my code in a way that’s modular and easy to understand. For example, database queries are broken into a separate file (i.e. database-mysql/index.js) and imported as “db.” functions. All code pertaining to game logic (i.e. checking for wins or ties, etc.) is also stored separately as server/gameLogic.js. The main server/index.js primarily handles socket communication. Function names are self-describing (i.e. “isWinningMove” returns true if the last move caused a win, false if not). Because Node is single-threaded, I used Bluebird Promises to handle asynchronous actions like database updates while keeping code readable and maintainable. Additionally, functions and React props were placed in alphabetical order so they are easy to find.

###Game Design:

After entering “localhost:3000”, a user lands on the sign in page. To play the game, a user enters a username and can either create a new game or join an existing one. To join an existing one, they also need to enter the Game ID. After successful sign in, the view is switched to game mode. Multiple pairs of players can play Tic Tac Toe at the same time since communication is broadcasted from the server to each pair’s Game ID. 

Moves begin by being verified on the client side. Only moves that are made by a username that is identical the the “turn” state variable are broadcast to the server to prevent out-of-turn moves. Users are notified if their moves are invalid. Valid moves are checked within server/gameLogic.js and stored within the database. Once complete, the move will be broadcast to both players and marked with the appropriate symbol. 

Code within server/gameLogic.js also checks whether each move caused a tie or a win. In these cases, the state of the game is changed, the number of wins is updated, and both players are given the option to reset the game. Resetting will create a new game within the database. However, the players will remain in the same socket room.

On the front end, the only class component is the index.jsx component. This was purposeful to keep all state information in a central location and avoid duplication. Sign in, game state, and the board were broken into separate stateless components. All styling was kept separate within the react-client/dist/stylesheet.css


### Known Issues:
- Page refresh currently not handled, so a user cannot re-enter their game. However, game data and board moves are persisted to a MySQL database. Once a means to handle page refreshesis added, existing game data could be pulled and sent to the user to resume their game.
- Blank usernames are currently not handled.