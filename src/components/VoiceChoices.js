import React, {Component} from 'react';
import {bool, number, func, string, object, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class VoiceChoices extends Component {

  componentDidMount() {
  }

  componentDidUpdate() {
    //this.props.loadVoicesAllGame(this.props.newGameData);
  }

  constructor() {
    super();
    this.clickAnswer = this.clickAnswer.bind(this);
    this.state = {clickedBtn: false};
  }

  clickAnswer = (voxid) => {
    this.props.actions.clickAnswer(this.props.whovoxGame);
    this.setState({clickedBtn: true});
    setTimeout( () => { this.props.actions.checkAnswer(voxid); }, 1500);
    setTimeout( () => { this.props.actions.prepNextQuestion(); }, 3250);
    setTimeout( () => { this.props.actions.loadVoicesAllGame(this.props.newGameData, this.props.ansCount); }, 2000);
  }

  render() {

    const {answered, timerOn, outOfTime, firstname, lastname, voxid, newGameData, ansCount} = this.props;

    return (
      <>
        <button
          className={!this.state.clickedBtn ? 'vxBtn' : 'vxBtnSel'}
          voxid={voxid}
          onClick={ () => this.clickAnswer(voxid) }
          disabled={!timerOn ? true : false}
          newgamedata={newGameData}
          anscount={ansCount}
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
    ansCount: oneOfType([string,number]),
    whovoxGame: object,
    newGameData: array,
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
      newGameData: state.whovoxGame.newGameData,
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
