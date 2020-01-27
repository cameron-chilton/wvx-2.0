import React, { Component } from "react";
import {object, func} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class AnswerBtns extends Component {

  constructor() {
    super();
    this.clickAnswer = this.clickAnswer.bind(this);
  }

  clickAnswer = () => {
    this.props.actions.clickAnswer(this.props.whovoxGame);
  }

  render() {
    return (
      <div className="btn-holder">
        <button
          className='vxBtn'
          id='btn0'
          //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
          //category={props.category}
          onClick={this.clickAnswer}
        >1
        </button>
        <button
          className='vxBtn'
          id='btn1'
          //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
          //category={props.category}
          onClick={this.clickAnswer}
        >2
        </button>
        <button
          className='vxBtn'
          id='btn2'
          //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
          //category={props.category}
          onClick={this.clickAnswer}
        >3
        </button>
        <button
          className='vxBtn'
          id='btn3'
          //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
          //category={props.category}
          onClick={this.clickAnswer}
        >4
        </button>
        <button
          className='vxBtn'
          id='btn4'
          //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
          //category={props.category}
          onClick={this.clickAnswer}
        >5
        </button>

      {/*
        utils.range(0, 4).map(number => (
          <VoiceChoices
            key={number}
            id='btn'
            clickAnswer={this.clickAnswer}
            //id={voxIDs && voxIDs[number]}
            //category={categories && categories[number]}
            //number={number}
            //isBtnClicked={isBtnClicked}
            //firstname={firstnames && firstnames[number]}
            //lastname={lastnames && lastnames[number]}
            //name={firstnames && firstnames[number] + ' ' + lastnames && lastnames[number]}
          />
          ))
        */}
    </div>
    );
  }
}

AnswerBtns.propTypes = {
  actions: object.isRequired,
  whovoxGame: object,
  clickAnswer: func,
  //timer: number,
  //timerOn: bool,
  //btnTxt: oneOfType([string, number]),
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
)(AnswerBtns);




