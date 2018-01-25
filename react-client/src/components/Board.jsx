import React from 'react';

const Board = (props) => (
  <div>
    {props.invalid === true
      ? <div className="invalid" >Sorry, that move is not valid.</div>
      : <div></div>
    }
  	<table>
      <tbody>
    		<tr className="top">
          <td className="left" onClick={props.handleMove}></td>
          <td className="mid" onClick={props.handleMove}></td> 
          <td className="right" onClick={props.handleMove}></td>  
        </tr>
        <tr className="mid">
          <td className="left" onClick={props.handleMove}></td>
          <td className="mid" onClick={props.handleMove}></td> 
          <td className="right" onClick={props.handleMove}></td>  
        </tr>
        <tr className="bottom">
          <td className="left" onClick={props.handleMove}></td>
          <td className="mid" onClick={props.handleMove}></td> 
          <td className="right" onClick={props.handleMove}></td>  
        </tr>
      </tbody>
  	</table>
  </div>
)

export default Board;