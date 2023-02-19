import React, {Component} from 'react';
import {string, number, oneOfType, bool, object, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';

class GameInfo extends Component {

  constructor() {
    super();
    this.clickCategory = this.clickCategory.bind(this);
    this.state = {checkCount: -3}
  }

  clickCategory = (e) => {

      if (e.target.checked && this.state.checkCount >= -3) {
        this.setState((prevState) => ({checkCount: prevState.checkCount + 1}));
        this.props.actions.catCheckHandler(e.target.value);
      }
      else if (!e.target.checked && this.state.checkCount === -3) {
        e.preventDefault();
        e.stopPropagation();
      }
      else if (e.target.checked && this.state.checkCount === -3) {
        this.setState((prevState) => ({checkCount: prevState.checkCount + 1}));
        this.props.actions.catCheckHandler(e.target.value);
      }
      else if (!e.target.checked && this.state.checkCount !== -3) {
        this.setState((prevState) => ({checkCount: prevState.checkCount - 1}));
        this.props.actions.catCheckHandler(e.target.value);
      }

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
      sportsChecked,
      newGameData
    } = this.props;

    // get category from newGameData
    const ansID3 = newGameData || [];
    const ansID2 = ansID3[voxCount] || {};
    const category = ansID2.CATEGORY || '';

    return (
      <>
        <div className="gameInfo">
            <div className="catCount">
              <div>VOX <span className="bold">{voxCount + 1}</span> OF <span className="bold">5</span></div>
              <div className="toUpper">{category}</div>
              <div className="first">
                <input type="checkbox" id="MoviesTvChk" value="Movies/TV" onClick={this.clickCategory} checked={movTvChecked} disabled={!gameOver ? true : false} />
                <label htmlFor="MoviesTvChk" className="catLabel"><span className={gameOver ? 'catLabelPulse' : ''}>MOVIES/TV</span></label>
              </div>
              <div className="second">
                <input type="checkbox" id="MusicArtsChk" value="Music/Arts" onClick={this.clickCategory} checked={musArtsChecked} disabled={!gameOver ? true : false} />
                <label htmlFor="MusicArtsChk" className="catLabel"><span className={gameOver ? 'catLabelPulse' : ''}>MUSIC/ARTS</span></label>
              </div>
            </div>
            <div className="scoreBox">
              <div className="scoreNum">{score.toLocaleString()}</div>
              <div className="scoreTxt">SCORE</div>
            </div>
            <div className="rightWrong">
              <div>RIGHT: <span className="bold">{ansRight}</span></div>
              <div>WRONG: <span className="bold">{ansWrong}</span></div>
              <div className="first">
                <label htmlFor="NewsPolChk" className="catLabel"><span className={gameOver ? 'catLabelPulse' : ''}>NEWS</span></label>
                <input type="checkbox" id="NewsPolChk" value="News/Politics" onClick={this.clickCategory} checked={newsPolChecked} disabled={!gameOver ? true : false} />
              </div>
              <div className="second">
                <label htmlFor="SportsChk" className="catLabel"><span className={gameOver ? 'catLabelPulse' : ''}>SPORTS</span></label>
                <input type="checkbox" id="SportsChk" value="Sports" onClick={this.clickCategory} checked={sportsChecked} disabled={!gameOver ? true : false} />
              </div>
            </div>
        </div>
      </>
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
  newGameData: array,
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
    newGameData: state.whovoxGame.newGameData,
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
