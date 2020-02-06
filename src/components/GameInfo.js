import React, {Component} from 'react';
import {string, number, oneOfType, bool, func, object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class GameInfo extends Component {

  constructor() {
    super();
    this.clickCategory = this.clickCategory.bind(this);
    this.state = {checkBoxValue: this.state.checkboxValue};
  }

  clickCategory = () => {
    console.log('value: ' + this.value)
    this.props.actions.catCheckHandler(this.value);
    this.setState({checkBoxValue: !this.state.checkboxValue});
  }

  render() {

    const {
      voxCount,
      score,
      ansRight,
      ansWrong,
      movTvChecked,
    } = this.props;

    return (
      <div className='game-info'>
        <div>
          <span>Vox {voxCount} of 5</span>
          <span>Score: {score.toLocaleString()}</span>
          <span>Right: {ansRight}</span>
          <span>Wrong: {ansWrong}</span>
        </div>
        <div>
          <span>
            <input type="checkbox" id="MoviesTVchk" value={this.state.checkboxValue} onChange={this.clickCategory} checked={movTvChecked} />
            <label htmlFor="MoviesTVchk">Movies/TV</label>
          </span>
          <span><input type="checkbox" />Music/Arts</span>
          <span><input type="checkbox" />News/Politics</span>
          <span><input type="checkbox" />Sports</span>
        </div>
      </div>
    );
  }
}

GameInfo.propTypes = {
  actions: object.isRequired,
  voxCount: oneOfType([string,number]),
  score: oneOfType([string,number]),
  ansRight: oneOfType([string,number]),
  ansWrong: oneOfType([string,number]),
  movTvChecked: bool,
  catCheckHandler: func,
};

function mapStateToProps(state) {
  return {
    voxCount: state.whovoxGame.voxCount,
    score: state.whovoxGame.score,
    ansRight: state.whovoxGame.ansRight,
    ansWrong: state.whovoxGame.ansWrong,
    movTvChecked: state.whovoxGame.movTvChecked
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
)(GameInfo);
