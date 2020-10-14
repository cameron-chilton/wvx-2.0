import React, {Component} from "react";
import {func} from "prop-types";

// React Component to display the timer
class GameFirstDialog extends Component {

  render() {
    return (
      <div className="overlayContent">
        <h1>WHOVOX</h1>
        <h2>VOICE GUESSING GAME</h2>
        <h3>TURN SOUND ON!</h3>
        <ol>
          <li>Press OK</li>
          <li>Press STARTVOX</li>
          <li>Play WHOVOX!</li>
        </ol>
        <p><button className="save-button" onClick={ () => {this.props.isFirstGame();} }>OK</button></p>
      </div>
    );
  }
}

GameFirstDialog.propTypes = {
  isFirstGame: func
};

export default GameFirstDialog;
