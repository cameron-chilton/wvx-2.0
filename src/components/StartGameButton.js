import React, {Component} from "react";
import {string, bool, object, number, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

// React Component shown to start the next game
class StartGameButton extends Component {

  constructor() {
    super();
    this.tryAgain = this.tryAgain.bind(this);
    this.state = {
      toggleTextVal: false,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout( () => {
      this.toggleText();
    }, 1000);
  }

  toggleText = () => {
    this.interval = setInterval( () => {
      !this.state.toggleTextVal ? this.setState({toggleTextVal: true}) : this.setState({toggleTextVal: false});
    }, 1300);
  }

  tryAgain = () => {
    this.props.actions.startNextGame();
  }

  render() {
    return (
      <div className="play-button-container">
        <a href="#" onClick={this.tryAgain()}>
          <button className="play-button" title="Play the voice game WHOVOX">
            {
              !this.state.toggleTextVal ? <><span className="btnYellow">PLAY WHOVOX</span></> : <><span className="btnOrange">CLICK TO PLAY</span></>
            }
          </button>
        </a>
        <div className="click-play box1">Click to play WHOVOX</div>
        <div className="click-play box2">Free & fun voice recognition game</div>
        <div className="click-play box3">Test your voice knowledge</div>
        <div className="click-play box4">1,000s of famous voices</div>
      </div>
    );
  }
}

StartGameButton.propTypes = {
  whovoxGame: object,
  newGameData: array,
  actions: object.isRequired,
  voxCount: oneOfType([string,number]),
  ansCount: oneOfType([string,number]),
  timer: number,
  timerOn: bool,
  outOfTime: bool,
  btnTxt: oneOfType([string, number]),
  score: oneOfType([string, number]),
  ansRight: oneOfType([string, number]),
  ansWrong: oneOfType([string, number]),
  voiceQuestion: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    whovoxGame: state.whovoxGame
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartGameButton);
