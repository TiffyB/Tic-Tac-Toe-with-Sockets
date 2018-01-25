import React from 'react';

const Board = (props) => (
  <div>
    {props.invalid === true
      ? <div className="invalid" >Sorry, that move is not valid.</div>
      : <div></div>
    }
  	<table>
      <tbody>
    		<tr>
          <td className="top_left" onClick={props.handleMove}>{props.top_left}</td>
          <td className="top_mid" onClick={props.handleMove}>{props.top_mid}</td> 
          <td className="top_right" onClick={props.handleMove}>{props.top_right}</td>  
        </tr>
        <tr>
          <td className="mid_left" onClick={props.handleMove}>{props.mid_left}</td>
          <td className="mid_mid" onClick={props.handleMove}>{props.mid_mid}</td> 
          <td className="mid_right" onClick={props.handleMove}>{props.mid_right}</td>  
        </tr>
        <tr>
          <td className="bottom_left" onClick={props.handleMove}>{props.bottom_left}</td>
          <td className="bottom_mid" onClick={props.handleMove}>{props.bottom_mid}</td> 
          <td className="bottom_right" onClick={props.handleMove}>{props.bottom_right}</td>  
        </tr>
      </tbody>
  	</table>
    {props.gameStatus === "Game won!" || props.gameStatus === "Tied game!"
      ? <div>{props.gameStatus}<button onClick={props.resetGame}>Reset Game</button></div>
      : <div></div>
    }
  </div>
)

export default Board;