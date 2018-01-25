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
    - “mysql -u root < database/schema.sql” (creates database “mightyhive” under user “root” with no password)
    - “npm install” (installs node module dependencies)
	- "npm run react-dev"
	- "npm run server-dev"
	- In the browser, navigate to “localhost:3000”

## My Solution:

### Known Issues:
- Page refresh currently not handled. User cannot re-enter game.