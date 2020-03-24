import React, {Component} from 'react';
import {string, number, oneOfType, bool, object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class GameInfo extends Component {

  componentDidUpdate() {
  }

  constructor() {
    super();
    this.clickCategory = this.clickCategory.bind(this);
  }

  clickCategory = () => {
    this.props.actions.catCheckHandler(event.target.value);
  }

  render() {

    const {
      voxCount,
      gameOver,
      score,
      ansRight,
      ansWrong,
      movTvChecked,
      musArtsChecked,
      newsPolChecked,
      sportsChecked
    } = this.props;

    return (
      <div className='game-info'>
        <div>
          <span>Vox {voxCount + 1} of 5</span>
          <span>Score: {score.toLocaleString()}</span>
          <span>Right: {ansRight}</span>
          <span>Wrong: {ansWrong}</span>
        </div>
        <div>
          <span>
            <input type="checkbox" id="MoviesTvChk" value="Movies/TV" onChange={this.clickCategory} checked={movTvChecked} disabled={!gameOver ? true : false} />
            <label htmlFor="MoviesTvChk">Movies/TV</label>
          </span>
          <span>
            <input type="checkbox" id="MusicArtsChk" value="Music/Arts" onChange={this.clickCategory} checked={musArtsChecked} disabled={!gameOver ? true : false} />
            <label htmlFor="MusicArtsChk">Music/Arts</label>
          </span>
          <span>
            <input type="checkbox" id="NewsPolChk" value="News/Politics" onChange={this.clickCategory} checked={newsPolChecked} disabled={!gameOver ? true : false} />
            <label htmlFor="NewsPolChk">News/Politics</label>
          </span>
          <span>
            <input type="checkbox" id="SportsChk" value="Sports" onChange={this.clickCategory} checked={sportsChecked} disabled={!gameOver ? true : false} />
            <label htmlFor="SportsChk">Sports</label>
          </span>
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
  musArtsChecked: bool,
  newsPolChecked: bool,
  sportsChecked: bool,
  gameOver: bool,
};

function mapStateToProps(state) {
  return {
    voxCount: state.whovoxGame.voxCount,
    score: state.whovoxGame.score,
    ansRight: state.whovoxGame.ansRight,
    ansWrong: state.whovoxGame.ansWrong,
    movTvChecked: state.whovoxGame.movTvChecked,
    musArtsChecked: state.whovoxGame.musArtsChecked,
    newsPolChecked: state.whovoxGame.newsPolChecked,
    sportsChecked: state.whovoxGame.sportsChecked,
    gameOver: state.whovoxGame.gameOver,
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
