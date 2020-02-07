import React, { Component } from 'react';
import {bool, number, func, string, oneOfType, object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class VoiceChoices extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  constructor() {
    super();
    this.clickAnswer = this.clickAnswer.bind(this);
    this.state = {clickedBtn: false};
  }

  clickAnswer = () => {
    this.props.actions.clickAnswer(this.props.whovoxGame);
    this.setState({clickedBtn: true});
  }

  render() {

    const {voxCount, timerOn} = this.props;

    return (
      <>
        <button
          className={!this.state.clickedBtn ? 'vxBtn' : 'vxBtnSel'}
          //id={number}
          //category={props.category}
          onClick={this.clickAnswer}
          disabled={!timerOn ? true : false}
          //number={props.number}
          //name={props.firstname + ' ' + props.lastname}
        >
          {!timerOn ? '?' : voxCount}
        </button>
    </>
    );
  }
}

  VoiceChoices.propTypes = {
    actions: object.isRequired,
    whovoxGame: object,
    voxCount: oneOfType([string,number]),
    clickAnswer: func,
    timerOn: bool,
  };

  function mapStateToProps(state) {
    return {
      voxCount: state.whovoxGame.voxCount,
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
  )(VoiceChoices);
