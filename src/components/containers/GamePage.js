import React, {Component} from 'react';
import {string, bool, object, number, oneOfType} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';
import * as actions from '../../actions/whovoxActions';

/**
* Whovox Game Props
*
* @props -- All should be passed in via Redux wiring.
*  @param {number} voxCount Is the game timer running or not?
*  @param {bool} timerOn Is the game timer running or not?
*/

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
      timerOn,
      btnTxt,
      timer,
      score,
      ansRight,
      ansWrong,
      movTvChecked
    } = this.props;

    return (
      <div className="game">
        <GameInfo
          voxCount={voxCount}
          score={score}
          ansRight={ansRight}
          ansWrong={ansWrong}
          movTvChecked={movTvChecked}
        />
        <Timer
          timer={timer}
          timerOn={timerOn}
          interval={interval}
          btnTxt={btnTxt}
        />
        <AnswerBtns
          onAnswerClick={this.onAnswerClick}
          timerOn={timerOn}
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
  whovoxGame: object,
  actions: object.isRequired,
  voxCount: oneOfType([string,number]),
  timer: number,
  timerOn: bool,
  btnTxt: oneOfType([string, number]),
  score: oneOfType([string, number]),
  ansRight: oneOfType([string, number]),
  ansWrong: oneOfType([string, number]),
  movTvChecked: bool,
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
