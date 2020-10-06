import React, {Component} from "react";
import {func} from "prop-types";

// React Component to display the timer
class GameFirstDialog extends Component {

  render() {
    return (
      <div className="overlayContent">
        <p>Press PLAY...</p>
        <p>Then Press STARTVOX to Start WHOVOX Voice Game...</p>
        <p><button className="save-button" onClick={ () => {this.props.isFirstGame();} }>PLAY</button></p>
        <p>TURN SOUND ON!</p>
      </div>
    );
  }
}

GameFirstDialog.propTypes = {
  isFirstGame: func
};

export default GameFirstDialog;
