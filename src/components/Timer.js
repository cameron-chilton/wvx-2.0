import React, { Component } from "react";
import { string, bool, object, number, oneOfType } from "prop-types";
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
    return (
      <div>
        <button className='play-button' onClick={!this.props.timerOn ? this.startTimer : undefined}>
          { typeof this.props.btnTxt == 'number' ? this.format(this.props.btnTxt) : this.props.btnTxt  }
        </button>
      </div>
    );
  }
}

Timer.propTypes = {
  actions: object.isRequired,
  whovoxGame: object,
  timer: number,
  timerOn: bool,
  btnTxt: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    whovoxGame: state.whovoxGame,
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
