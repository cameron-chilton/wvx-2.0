import React, { Component } from "react";
import {bool, func, object, array, number, oneOfType, string} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';


class AnswerBtns extends Component {

  render() {

    const {timerOn, answered, newGameData, ansCount} = this.props;
    const voiceQuestion = this.props.voiceQuestion || [];
    //console.log('voiceQuestion AnswerBtns: ' + JSON.stringify(voiceQuestion));
    const voxIDs = voiceQuestion.map(voiceQuestion => voiceQuestion.id);
    //console.log('voxIDs: ' + voxIDs);
    const firstnames = voiceQuestion.map(voiceQuestion => voiceQuestion.firstname);
    const lastnames = voiceQuestion.map(voiceQuestion => voiceQuestion.lastname);

    return (
      <div className="btn-holder">
        {
          utils.range(0,4).map(number => (
            <VoiceChoices
              key={number}
              voxid={voxIDs && voxIDs[number]}
              onClick={this.clickAnswer}
              timerOn={timerOn}
              firstname={firstnames && firstnames[number]}
              lastname={lastnames && lastnames[number]}
              answered={answered}
              newGameData={newGameData}
              ansCount={ansCount}
            />
          ))
          }
    </div>
    );
  }
}

AnswerBtns.propTypes = {
  actions: object.isRequired,
  whovoxGame: object,
  ansCount: oneOfType([string,number]),
  clickAnswer: func,
  timerOn: bool,
  voiceQuestion: array,
  newGameData: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    voiceQuestion: state.whovoxGame.voiceQuestion,
    answered: state.whovoxGame.answered,
    ansCount: state.whovoxGame.ansCount,
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
)(AnswerBtns);




