import React, {Component} from 'react';
import {bool, number, func, string, object, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class VoiceChoices extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {

    if (this.props.timerOn && !this.props.answered && this.state.showRightAnswer) {
      this.setState({clickedBtn: false});
      this.setState({showRightAnswer: false});
    }

  }

  constructor() {
    super();
    this.clickAnswer = this.clickAnswer.bind(this);
    this.state = {
      clickedBtn: false,
      showRightAnswer: false,
    };
  }

  clickAnswer = (voxid) => {
    this.props.actions.clickAnswer();
    this.setState({clickedBtn: true});
    setTimeout( () => {
      this.props.actions.checkAnswer(voxid);
      this.setState({showRightAnswer: true});
      if (this.props.ansCount <= 4) {
        setTimeout( () => { this.props.actions.prepNextQuestion(); }, 1500);
        setTimeout( () => { this.props.actions.loadVoicesAllGame(this.props.newGameData, this.props.ansCount); }, 500);
      }
      if (this.props.ansCount === 5) {
        setTimeout( () => { this.props.actions.gameOver(); }, 1500);
      }
    }, 1300);
  }

  render() {

    const {answered, timerOn, outOfTime, firstname, lastname, voxid, newGameData, ansCount, btnClass, isRightAnswer} = this.props;
    return (
      <>
        <button
          className={
            !timerOn ? (
              !this.state.showRightAnswer ? (
                !this.state.clickedBtn ? btnClass : 'vxBtnSel'
              ) : (
                !this.state.clickedBtn ? btnClass : (isRightAnswer === 'true' ? 'vxBtnRight' : 'vxBtnSel')
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
            (timerOn) ? (firstname + ' ' + lastname) : (!answered) ? '?' : (firstname + ' ' + lastname)
          ) : (
            (firstname + ' ' + lastname)
          )
        }</button>
      </>
    );
  }
}

  VoiceChoices.propTypes = {
    actions: object.isRequired,
    voxid: oneOfType([string,number]),
    ansCount: oneOfType([string,number]),
    whovoxGame: object,
    newGameData: array,
    clickAnswer: func,
    updateBtns: func,
    answered: bool,
    timerOn: bool,
    outOfTime: bool,
    isRightAnswer: string,
    firstname: string,
    lastname: string,
    btnClass: string,
  };

  function mapStateToProps(state) {
    return {
      outOfTime: state.whovoxGame.outOfTime,
      newGameData: state.whovoxGame.newGameData,
      timerOn: state.whovoxGame.timerOn,
      ansCount: state.whovoxGame.ansCount,
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
