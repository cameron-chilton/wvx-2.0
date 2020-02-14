import React, { Component } from "react";
import {string, bool, object, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

// React Component to display the timer
class Timer extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
  }

  startTimer = () => {
    this.props.actions.startTimer(this.props.whovoxGame);
  }

  format(time) {
    const pad = (time, length) => {
      while (time.length < length) {
        time = '0' + time;
      }
      return time;
    }

    time = new Date(time);
    let s = time.getSeconds().toString();
    let ms = pad((time.getMilliseconds() / 10).toFixed(0), 2);

    return `${s}.${ms}`;
  }

  render() {
    const {timerOn, btnTxt} = this.props;
    return (
      <div>
        <button className='play-button' onClick={!timerOn ? this.startTimer : undefined}>
          {typeof btnTxt == 'number' ? this.format(btnTxt) : btnTxt}
        </button>
      </div>
    );
  }
}

Timer.propTypes = {
  actions: object.isRequired,
  whovoxGame: object,
  timerOn: bool,
  btnTxt: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    btnTxt: state.whovoxGame.btnTxt
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
)(Timer);
