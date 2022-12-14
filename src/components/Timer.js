import React, {Component} from "react";
import {string, bool, object, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import whovoxUtils from '../utils/whovox-utils';

// React Component to display the timer
class Timer extends Component {

  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
    this.startNextGameHOF = this.startNextGameHOF.bind(this);
    this.state = {
      isAnswered: false,
      toggleTextVal: false,
    };
  }

  componentDidUpdate() {
    // clear local state
    if (this.props.timerOn && !this.props.answered && this.state.isAnswered) {
      this.setState({isAnswered: false});
      this.setState({toggleTextVal: false});
      clearTimeout(this.timeout);
      clearInterval(this.interval);
    }
    // alternate button text after answer is shown
    if ((this.props.answered || this.props.outOfTime) && !this.state.isAnswered) {
      this.setState({isAnswered: true});
      this.timeout = setTimeout( () => {
        this.toggleText();
      }, 2300);
    }
  }

  componentDidMount() {
    this.timeout = setTimeout( () => {
      this.toggleText();
    }, 1000);
  }

  toggleText = () => {
    this.interval = setInterval( () => {
      !this.state.toggleTextVal ? this.setState({toggleTextVal: true}) : this.setState({toggleTextVal: false});
    }, 1300);
  }

  startTimer = () => {
    this.props.voxCount !== 4 ? (
      this.timeout = setTimeout( () => {
        clearInterval(this.interval);
        this.props.actions.startTimer();
      }, 250)
    ) : (
      this.props.actions.startNextGame()
    )
  }
  startNextGameHOF = () => {
    if (this.props.showHOF) {
      this.props.actions.toggleHallfOfFame();
      this.props.actions.startNextGame();
    }
  }

  render() {
    const {timerOn, btnTxt, gameOver, loading, voxCount, showHOF} = this.props;
    return (
      <div>
        {!showHOF ?
        <><button className="play-button" onClick={!timerOn ? this.startTimer : undefined} disabled={loading && true} id="startvoxBtn">
          {
            !this.state.isAnswered ? (
              typeof btnTxt == 'number' ? <><span className={(btnTxt > 6600) ? 'btnGreen' : (btnTxt > 3300) ? 'btnYellow' : 'btnRed'}>{whovoxUtils.formatTime(btnTxt)}</span></> : (!this.state.toggleTextVal ? <><span className="btnYellow">{btnTxt}</span></> : <><span className="btnOrange">{(voxCount == 0) ? 'CLICK TO PLAY' : btnTxt}</span></>)
            ) : (
              !this.state.toggleTextVal ? <><span className="btnOrange">{btnTxt}</span></> : (!gameOver ? (<><span className="btnYellow">{'VOX ' + (voxCount + 1) + ' OF 5'}</span></>) : <><span className="btnYellow">PLAY AGAIN</span></>)
            )
          }
        </button></> :
          <><button className="play-button" onClick={this.startNextGameHOF}>
            {
              !this.state.toggleTextVal ? <><span className="btnYellow">START WHOVOX</span></> : <><span className="btnOrange">CLICK TO PLAY</span></>
            }
          </button></>
        }
      </div>
    );
  }
}

Timer.propTypes = {
  actions: object,
  whovoxGame: object,
  timerOn: bool,
  answered: bool,
  gameOver: bool,
  loading: bool,
  outOfTime: bool,
  showHOF: bool,
  voxCount: oneOfType([string,number]),
  btnTxt: oneOfType([string, number]),
  score: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    btnTxt: state.whovoxGame.btnTxt,
    voxCount: state.whovoxGame.voxCount,
    score: state.whovoxGame.score,
    answered: state.whovoxGame.answered,
    gameOver: state.whovoxGame.gameOver,
    loading: state.whovoxGame.loading,
    outOfTime: state.whovoxGame.outOfTime,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Timer);
