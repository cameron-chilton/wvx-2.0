import React, {Component} from 'react';
import {string, bool, object, number, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';
import * as actions from '../../actions/whovoxActions';

let interval = null;

class GamePage extends Component {

  componentDidUpdate() {
    // timer start
    if ( (this.props.whovoxGame.timerOn) && (interval === null) ) {
      interval = setInterval( () => {
        this.props.actions.tickTimer(this.props.whovoxGame);
      });
    }
    // timer stop
    if ( (!this.props.whovoxGame.timerOn) && (interval !== null) ) {
      clearInterval(interval);
      interval = null;
    }
  }

  render() {

    const {
      voxCount,
      ansCount,
      timerOn,
      btnTxt,
      timer,
      score,
      ansRight,
      ansWrong,
      nextQuestion,
      voiceQuestion,
      answered,
      gameIdFromUri,
      newGameData
    } = this.props;

    return (
      <div className="game">
        <GameInfo
          voxCount={voxCount}
          score={score}
          ansRight={ansRight}
          ansWrong={ansWrong}
          timerOn={timerOn}
        />
        <Timer
          timer={timer}
          timerOn={timerOn}
          interval={interval}
          btnTxt={btnTxt}
          voxCount={voxCount}
          score={score}
          gameIdFromUri={gameIdFromUri}
        />
        <AnswerBtns
          onAnswerClick={this.onAnswerClick}
          timerOn={timerOn}
          voiceQuestion={voiceQuestion}
          answered={answered}
          newGameData={newGameData}
          ansCount={ansCount}
        />
        {/*
        <FuelSavingsForm
          onClearClick={this.clearFuelSavings}
          onSaveClick={this.saveFuelSavings}
          onChange={this.calculateFuelSavings}
          fuelSavings={this.props.fuelSavings}
        />
        */}
      </div>
    );
  }
}

GamePage.propTypes = {
  gameIdFromUri: string,
  whovoxGame: object,
  newGameData: array,
  actions: object.isRequired,
  voxCount: oneOfType([string,number]),
  ansCount: oneOfType([string,number]),
  timer: number,
  timerOn: bool,
  btnTxt: oneOfType([string, number]),
  score: oneOfType([string, number]),
  ansRight: oneOfType([string, number]),
  ansWrong: oneOfType([string, number]),
  voiceQuestion: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    //fuelSavings: state.fuelSavings,
    whovoxGame: state.whovoxGame,
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
)(GamePage);
