import React, { Component } from "react";
import { string, bool, object, number, oneOfType } from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/whovoxActions';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';

let interval = null;

class GamePage extends Component {

  componentDidMount() {
  }

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

    return (
      <div className="game">
        <GameInfo
          voxCount={this.props.whovoxGame.voxCount}
        />
        <Timer
          timer={this.props.whovoxGame.timer}
          timerOn={this.props.whovoxGame.timerOn}
          interval={interval}
          btnTxt={this.props.whovoxGame.btnTxt}
        />
        <AnswerBtns
          onAnswerClick={this.onAnswerClick}
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
  actions: object.isRequired,
  whovoxGame: object,
  timer: number,
  timerOn: bool,
  btnTxt: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    //fuelSavings: state.fuelSavings,
    whovoxGame: state.whovoxGame,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
