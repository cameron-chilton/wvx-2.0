import React, {Component} from 'react';
import {bool, number, func, string, object, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import VoiceChoiceContent from './VoiceChoiceContent';
import VoiceChoiceWhosThis from './VoiceChoiceWhosThis';

class VoiceChoices extends Component {

  constructor() {
    super();
    this.clickAnswer = this.clickAnswer.bind(this);
    this.state = {
      clickedBtn: false,
      showRightAnswer: false,
    };
  }

  componentDidUpdate() {

    if (this.props.timerOn && !this.props.answered && this.state.showRightAnswer) {
      this.setState({clickedBtn: false});
      this.setState({showRightAnswer: false});
    }

  }

  clickAnswer = (voxid) => {
    this.props.actions.clickAnswer();
    this.setState({clickedBtn: true});
    setTimeout( () => {
      this.props.actions.checkAnswer(voxid);
      // play right/wrong sounds
      const answeredRight = (voxid === this.props.newGameData[this.props.voxCount].ID);
      this.audio = new Audio();
      // can play ogg or mp3
        if(answeredRight) {
          if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
            this.url = 'https://whovox.com/audio/_sfx/Answer_Right.ogg';
            this.audio = new Audio(this.url);
            }
          else {
            this.url = 'https://whovox.com/audio/_sfx/Answer_Right.mp3';
            this.audio = new Audio(this.url);
            }
          this.audio.play();
        }
        else {
          if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
            this.url = 'https://whovox.com/audio/_sfx/Answer_Wrong.ogg';
            this.audio = new Audio(this.url);
            }
          else {
            this.url = 'https://whovox.com/audio/_sfx/Answer_Wrong.mp3';
            this.audio = new Audio(this.url);
            }
          this.audio.play();
        }
      this.setState({showRightAnswer: true});
      if (this.props.ansCount <= 4) {
        setTimeout( () => { this.props.actions.prepNextQuestion(); }, 1200);
        setTimeout( () => { this.props.actions.loadVoicesAllGame(this.props.newGameData, this.props.ansCount); }, 500);
      }
      if (this.props.ansCount === 5) {
        setTimeout( () => {
          this.setState({clickedBtn: false});
          this.setState({showRightAnswer: false});
          this.props.actions.gameOver();
        }, 1500);
      }
    }, 1300);
  }

  render() {

    const {answered, timerOn, outOfTime, firstname, lastname, pic, voxid, newGameData, ansCount, btnClass, isRightAnswer} = this.props;

    return (
        <button
          className={
            !timerOn ? (
              !this.state.showRightAnswer ? (
                !this.state.clickedBtn ? btnClass : 'vxBtnSel'
              ) : (
                !this.state.clickedBtn ? btnClass : (isRightAnswer === true ? 'vxBtnRight' : 'vxBtnSel')
              )
            ) : (
              'vxBtn'
            )
          }
          voxid={voxid}
          onClick={ () => {this.clickAnswer(voxid); this.props.updateBtns();} }
          disabled={!timerOn ? true : false}
          newgamedata={newGameData}
          anscount={ansCount}
        >{
          (!outOfTime) ? (
            (timerOn) ?
              <VoiceChoiceContent pic={pic} firstname={firstname} lastname={lastname} /> :
              (!answered) ?
                <VoiceChoiceContent pic={pic} firstname={firstname} lastname={lastname} timerOn={timerOn} answered={answered} /> :
                <>
                  <VoiceChoiceContent pic={pic} firstname={firstname} lastname={lastname} timerOn={timerOn} answered={answered} />
                  <VoiceChoiceWhosThis firstname={firstname} lastname={lastname} />
                </>
          ) : (
            <>
              <VoiceChoiceContent pic={pic} firstname={firstname} lastname={lastname} />
              <VoiceChoiceWhosThis firstname={firstname} lastname={lastname} />
            </>
          )
        }</button>
    );
  }
}

  VoiceChoices.propTypes = {
    actions: object.isRequired,
    voxid: oneOfType([string,number]),
    ansCount: oneOfType([string,number]),
    voxCount: oneOfType([string,number]),
    whovoxGame: object,
    score: number,
    newGameData: array,
    clickAnswer: func,
    updateBtns: func,
    answered: bool,
    timerOn: bool,
    outOfTime: bool,
    isRightAnswer: bool,
    firstname: string,
    lastname: string,
    pic: string,
    btnClass: string,
  };

  function mapStateToProps(state) {
    return {
      outOfTime: state.whovoxGame.outOfTime,
      newGameData: state.whovoxGame.newGameData,
      timerOn: state.whovoxGame.timerOn,
      ansCount: state.whovoxGame.ansCount,
      score: state.whovoxGame.score,
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
  )(VoiceChoices);
