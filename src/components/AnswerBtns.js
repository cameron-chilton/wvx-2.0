import React, { Component } from "react";
import {bool, number, func, string, oneOfType, object, array} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
//import {setGameId,startDataLoad,} from '../actions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';


class AnswerBtns extends Component {

  render() {

    const {voxCount, timerOn, answered} = this.props;

    const loadAll = this.props.gameVoices || [];
    const thisQuestion = loadAll[voxCount] || {};
    const questionObj = thisQuestion[voxCount] || [];
    const ansIDs = questionObj.map(questionObj => questionObj.id);
    const firstnames = questionObj.map(questionObj => questionObj.firstname);
    const lastnames = questionObj.map(questionObj => questionObj.lastname);

    return (
      <div className="btn-holder">
        {
        utils.range(0, 4).map(number => (
          <VoiceChoices
            key={number}
            voxCount={voxCount}
            id={ansIDs && ansIDs[number]}
            //category={categories && categories[number]}
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
  voxCount: oneOfType([string,number]),
  clickAnswer: func,
  timerOn: bool,
  gameVoices: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    voxCount: state.whovoxGame.voxCount,
    gameVoices: state.whovoxGame.gameVoices,
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




