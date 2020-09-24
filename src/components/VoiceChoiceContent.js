import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import {string, bool} from 'prop-types';

const VoiceChoiceContent = ({firstname, lastname, pic, timerOn, answered}) => {

  return (
    <>
      <span className="ansPic">
          <img src={(!timerOn && !answered) ? 'https://whovox.com/imgs/noVox.png' : (!timerOn && answered) ? `data:image/jpeg;base64,${pic}` : `data:image/jpeg;base64,${pic}`}></img>
      </span>
      <span className="ansName">{(!timerOn && !answered) ? <span className="ansQ">?</span> : firstname + ' ' + lastname}</span>
    </>
  );
};

VoiceChoiceContent.propTypes = {
  firstname: string,
  lastname: string,
  pic: string,
  timerOn: bool,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    answered: state.whovoxGame.answered,
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
)(VoiceChoiceContent);
