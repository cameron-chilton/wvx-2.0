import React, {Component} from 'react';
import {bool, object, array, number, oneOfType, string} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import utils from '../utils/math-utils';
import VoiceChoices from './VoiceChoices';
import GameOver from './GameOver';

class AnswerBtns extends Component {

  componentDidUpdate() {

    // reset button when nextvox is clicked
    if (this.props.timerOn && !this.props.answered && this.state.showRightAnswer) {
      this.setState({showRightAnswer: false});
      this.setState({isOutOfTime: false});
    }

    // show right answer when time runs out
    if (this.props.outOfTime && !this.state.isOutOfTime) {
        setTimeout( () => {
          this.setState({showRightAnswer: true});
          this.props.actions.outOfTime();
          if (this.props.ansCount !== 5) {
            setTimeout( () => { this.props.actions.loadVoicesAllGame(this.props.newGameData, this.props.ansCount); }, 1000);
            setTimeout( () => { this.props.actions.prepNextQuestion(); }, 1800);
          }
          else {
            setTimeout( () => { this.props.actions.gameOver(); }, 2000);
          }
        }, 1200);
        this.setState({isOutOfTime: true});
    }

  }

  constructor() {
    super();
    this.state = {
      showRightAnswer: false,
      isOutOfTime: false,
    };
  }

  updateBtns = () => {
    setTimeout( () => {
      this.setState({showRightAnswer: true});
    }, 1300);
  }
  render() {

    const {timerOn, answered, ansCount, newGameData, voxCount, gameOver} = this.props;
    // get answer ID from newGameData
    const ansID3 = newGameData || [];
    const ansID2 = ansID3[voxCount] || {};
    const ansID = ansID2.ID || '';
    // map IDs and names
    const voiceQuestion = this.props.voiceQuestion || [];
    const voxIDs = voiceQuestion.map(voiceQuestion => voiceQuestion.id);
    const firstnames = voiceQuestion.map(voiceQuestion => voiceQuestion.firstname);
    const lastnames = voiceQuestion.map(voiceQuestion => voiceQuestion.lastname);

    return (
      <div className="btn-holder">

        {
          !gameOver ? (
            utils.range(0,4).map(number => (
              <VoiceChoices
                key={number}
                voxid={voxIDs && voxIDs[number]}
                btnClass={
                  (!this.state.showRightAnswer) ? (
                    'vxBtn'
                  ) : (
                    (ansID === voxIDs[number]) ? 'vxBtnRight' : 'vxBtn'
                  )
                }
                timerOn={timerOn}
                firstname={firstnames && firstnames[number]}
                lastname={lastnames && lastnames[number]}
                answered={answered}
                newGameData={newGameData}
                ansCount={ansCount}
                ansID={ansID}
                isRightAnswer={(ansID === voxIDs[number]) ? 'true' : 'false'}
                updateBtns={this.updateBtns}
              />
            ))
          ) : (
            <GameOver />
          )
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
  ansID: oneOfType([string,number]),
  timerOn: bool,
  outOfTime: bool,
  gameOver: bool,
  voiceQuestion: array,
  newGameData: array,
  answered: bool,
  isRightAnswer: string,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    outOfTime: state.whovoxGame.outOfTime,
    voiceQuestion: state.whovoxGame.voiceQuestion,
    newGameData: state.whovoxGame.newGameData,
    answered: state.whovoxGame.answered,
    ansCount: state.whovoxGame.ansCount,
    voxCount: state.whovoxGame.voxCount,
    gameOver: state.whovoxGame.gameOver,
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
