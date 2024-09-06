import React, {Component} from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
class GameFirstDialog extends Component {

  constructor() {
    super();
    this.playSound = this.playSound.bind(this);
  }

  playSound = () => {
    let audio = new Audio;
    audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    audio.load();
    audio.addEventListener('canplaythrough', () => {
      console.log('sound played: ' + audio)
      audio.play();
    });

  }

  render() {
    return (
      <div className="overlayContent">
        <h1>WHOVOX</h1>
        <h2>VOICE RECOGNITION GAME</h2>
        <h3>TURN SOUND ON!</h3>
        <ol>
          <li>Press START WHOVOX</li>
          <li>Pick Who Is Talking</li>
          <li>Press NEXTVOX for Next Voice</li>
        </ol>
        <p><button className="save-button" onClick={ () => {this.props.isFirstGame(); this.playSound();} }>OK!</button></p>
      </div>
    );
  }
}

GameFirstDialog.propTypes = {
  actions: object,
  isFirstGame: func,
  timerClicked: func,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameFirstDialog);

//export default GameFirstDialog;
