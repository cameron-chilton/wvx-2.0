import React, { Component } from "react";
import {bool, number, func, string, oneOfType, object} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';

class AnswerBtns extends Component {

  render() {

    const {voxCount, timerOn} = this.props;

    return (
      <div className="btn-holder">
        {
        utils.range(0, 4).map(number => (
          <VoiceChoices
            key={number}
            voxCount={voxCount}
            //id={voxIDs && voxIDs[number]}
            //category={categories && categories[number]}
            number={number}
            onClick={this.clickAnswer}
            timerOn={timerOn}
            //firstname={firstnames && firstnames[number]}
            //lastname={lastnames && lastnames[number]}
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
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    voxCount: state.whovoxGame.voxCount
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




