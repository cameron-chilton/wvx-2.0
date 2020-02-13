import React, { Component } from "react";
import {bool, func, object, array} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
//import {setGameId,startDataLoad,} from '../actions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';


class AnswerBtns extends Component {

  render() {

    const {timerOn, answered} = this.props;
    const questionVoices = this.props.questionVoices || [];
    //console.log('questionVoices: ' + JSON.stringify(questionVoices));
    const ansIDs = questionVoices.map(questionVoices => questionVoices.id);
    //console.log('ansIDs: ' + ansIDs);
    const firstnames = questionVoices.map(questionVoices => questionVoices.firstname);
    const lastnames = questionVoices.map(questionVoices => questionVoices.lastname);

    return (
      <div className="btn-holder">
        {
          utils.range(0,4).map(number => (
            <VoiceChoices
              key={number}
              id={ansIDs && ansIDs[number]}
              voxid={ansIDs && ansIDs[number]}
              onClick={this.clickAnswer}
              timerOn={timerOn}
              firstname={firstnames && firstnames[number]}
              lastname={lastnames && lastnames[number]}
              answered={answered}
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
  clickAnswer: func,
  timerOn: bool,
  questionVoices: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    questionVoices: state.whovoxGame.questionVoices,
    answered: state.whovoxGame.answered,
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




