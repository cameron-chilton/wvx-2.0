import React, {Component} from "react";
import {string, bool, object, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
import whovoxUtils from '../utils/whovox-utils';

// React Component to display the timer
class Timer extends Component {

  componentDidMount() {
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
      }, 2600);
    }

  }

  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
    this.state = {
      isAnswered: false,
      toggleTextVal: false,
    };
  }

  toggleText = () => {
    this.interval = setInterval( () => {
      !this.state.toggleTextVal ? this.setState({toggleTextVal: true}) : this.setState({toggleTextVal: false});
    }, 1300);
  }

  startTimer = () => {
    this.props.voxCount !== 4 ? (
      this.props.actions.startTimer()
    ) : (
      this.props.actions.startNextGame()
    )
  }

  render() {
    const {timerOn, btnTxt, gameOver, loading, voxCount} = this.props;
    return (
      <div>
        <button className='play-button' onClick={!timerOn ? this.startTimer : undefined} disabled={loading && true}>
          {
            !this.state.isAnswered ? (
              typeof btnTxt == 'number' ? whovoxUtils.formatTime(btnTxt) : btnTxt
            ) : (
              !this.state.toggleTextVal ? btnTxt : (!gameOver ? ('VOX ' + (voxCount + 1) + ' OF 5') : 'PLAY AGAIN')
            )
          }
        </button>
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
