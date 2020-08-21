import React, {Component} from "react";
import {func} from "prop-types";

// React Component to display the timer
class GameFirstDialog extends Component {

  render() {
    return (
      <>
        <div className="overlay"></div>
        <div className="overlayContainer">
          <div className="overlayContent">
            <h1>WHOVOX</h1>
            <p>WHOVOX is a voice listening game where you have 10 seconds to listen to a famous voice and decide who is speaking.</p>
            <h2>TURN SOUND ON!</h2>
            <button className="save-button" onClick={ () => {this.props.isFirstGame();} }>LET&apos;S PLAY!</button>
          </div>
        </div>
      </>
    );
  }
}

GameFirstDialog.propTypes = {
  isFirstGame: func
};

export default GameFirstDialog;
