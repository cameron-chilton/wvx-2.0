import React, { Component } from "react";
import {bool, func, object, array, number, oneOfType, string} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';


class AnswerBtns extends Component {

  render() {

    const {timerOn, answered, ansCount, newGameData} = this.props;
    const ansID3 = newGameData || [];
    const ansID2 = ansID3[0] || {};
    const ansID = ansID2.ID || '';
    console.log('answerBtns ansID: ' + ansID);

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
              ansID={ansID}
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
  voxCount: oneOfType([string,number]),
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
    newGameData: state.whovoxGame.newGameData,
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




