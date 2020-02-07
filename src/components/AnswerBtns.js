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

    const {voxCount, timerOn, gameVoices} = this.props;

    console.log('ansrBtns gameVoices: ' + JSON.stringify(gameVoices));

    return (
      <div className="btn-holder">
        {
        utils.range(0, 4).map(number => (
          <VoiceChoices
            key={number}
            voxCount={voxCount}
            id={gameVoices && gameVoices.props.children.id}
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
  gameVoices: array,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    voxCount: state.whovoxGame.voxCount,
    gameVoices: state.whovoxGame.gameVoices,
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




