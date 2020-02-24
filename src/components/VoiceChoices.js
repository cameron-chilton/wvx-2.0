import React, { Component } from 'react';
import {bool, number, func, string, object, oneOfType} from 'prop-types';
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

  clickAnswer = (voxid) => {
    this.props.actions.clickAnswer(this.props.whovoxGame);
    this.setState({clickedBtn: true});
    setTimeout( () => {
      this.props.actions.checkAnswer(voxid);
    }, 1200);
  }

  render() {

    const {answered, timerOn, outOfTime, firstname, lastname, voxid} = this.props;

    return (
      <>
        <button
          className={!this.state.clickedBtn ? 'vxBtn' : 'vxBtnSel'}
          voxid={voxid}
          onClick={ () => this.clickAnswer(voxid) }
          disabled={!timerOn ? true : false}
        >{
          (!outOfTime) ? (
            (timerOn) ? (firstname + ' ' + lastname) :
              (!answered) ? '?' : (firstname + ' ' + lastname)
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
    whovoxGame: object,
    clickAnswer: func,
    answered: bool,
    timerOn: bool,
    outOfTime: bool,
    firstname: string,
    lastname: string,
  };

  function mapStateToProps(state) {
    return {
      outOfTime: state.whovoxGame.outOfTime,
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
