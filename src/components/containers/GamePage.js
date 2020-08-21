import React, {Component} from 'react';
import {string, bool, object, number, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';
import GameFirstDialog from '../GameFirstDialog';
import * as actions from '../../actions/whovoxActions';

let interval = null;

class GamePage extends Component {

  constructor() {
    super();
    this.state = {
      voiceCount: '',
      isFirstGame: localStorage.getItem('First Game') || true,
    };
  }

  componentDidMount() {
    setTimeout( () => {
      fetch('http://localhost/WVX-2.0/src/php/getVoiceCount.php')
        .then(response => response.json())
        .then(data => this.setState({voiceCount: data}));
    }, 1);
  }

  componentDidUpdate() {

    // timer start
    if ( (this.props.whovoxGame.timerOn) && (interval === null) ) {

      // get clip from newGameData
      const clip3 = this.props.whovoxGame.newGameData || {};
      const clip2 = clip3[this.props.whovoxGame.voxCount] || '';
      const clip = clip2.CLIP_NAME || '';
      const nmFrst = clip.substr(0,1);
      let dir;

      if(nmFrst == 'A' || nmFrst == 'B') {dir = 'AB';}
      if(nmFrst == 'C' || nmFrst == 'D') {dir = 'CD';}
      if(nmFrst == 'E' || nmFrst == 'F') {dir = 'EF';}
      if(nmFrst == 'G' || nmFrst == 'H') {dir = 'GH';}
      if(nmFrst == 'I' || nmFrst == 'J') {dir = 'IJ';}
      if(nmFrst == 'K' || nmFrst == 'L') {dir = 'KL';}
      if(nmFrst == 'M' || nmFrst == 'N') {dir = 'MN';}
      if(nmFrst == 'O' || nmFrst == 'P') {dir = 'OP';}
      if(nmFrst == 'Q' || nmFrst == 'R') {dir = 'QR';}
      if(nmFrst == 'S' || nmFrst == 'T') {dir = 'ST';}
      if(nmFrst == 'U' || nmFrst == 'V') {dir = 'UV';}
      if(nmFrst == 'W' || nmFrst == 'X') {dir = 'WX';}
      if(nmFrst == 'Y' || nmFrst == 'Z') {dir = 'YZ';}

      this.audio = new Audio();

      // can play ogg or mp3
			if (this.audio.canPlayType) {
				if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
          this.url = 'audio/' + dir + '/' + clip + '.ogg';
          this.audio = new Audio(this.url);
					}
				if (this.audio.canPlayType('audio/mp3; codecs="mp3"')) {
          this.url = 'audio/' + dir + '/' + clip + '.mp3';
          this.audio = new Audio(this.url);
					}
        }
      this.audio.play();
      interval = setInterval( () => {
        this.props.actions.tickTimer(this.props.whovoxGame);
      });
    }
    // timer stop
    if ( (!this.props.whovoxGame.timerOn) && (interval !== null) ) {
      this.audio.pause();
      clearInterval(interval);
      interval = null;
    }

  }

  isFirstGame = () => {
    console.log('hit fg');
      this.setState({ isFirstGame: false }, () => {
        localStorage.setItem('First Game', this.state.isFirstGame);
      })
  }

  render() {
    const vxCt = this.state.voiceCount || '';
    const {
      voxCount,
      ansCount,
      timerOn,
      btnTxt,
      timer,
      score,
      ansRight,
      ansWrong,
      voiceQuestion,
      answered,
      newGameData,
      outOfTime
    } = this.props;

    return (
      <>
        {this.state.isFirstGame && <GameFirstDialog isFirstGame={this.isFirstGame} />}
        <div className="adBox"></div>
        <div className="game">
          <h1>WHOVOX</h1>
          <div className="voiceCount">
            <div className="voiceNum">{vxCt.toLocaleString()}</div>
            <div>VOICES</div>
          </div>
          <div className="topContainer">
            <GameInfo
              voxCount={voxCount}
              score={score}
              ansRight={ansRight}
              ansWrong={ansWrong}
              timerOn={timerOn}
              newGameData={newGameData}
            />
            <Timer
              timer={timer}
              timerOn={timerOn}
              interval={interval}
              btnTxt={btnTxt}
              voxCount={voxCount}
              score={score}
              answered={answered}
            />
            <AnswerBtns
              timerOn={timerOn}
              voiceQuestion={voiceQuestion}
              answered={answered}
              newGameData={newGameData}
              ansCount={ansCount}
              voxCount={voxCount}
              outOfTime={outOfTime}
            />
          </div>
        </div>
      </>
    );
  }
}

GamePage.propTypes = {
  whovoxGame: object,
  newGameData: array,
  actions: object.isRequired,
  voxCount: oneOfType([string,number]),
  ansCount: oneOfType([string,number]),
  timer: number,
  timerOn: bool,
  outOfTime: bool,
  btnTxt: oneOfType([string, number]),
  score: oneOfType([string, number]),
  ansRight: oneOfType([string, number]),
  ansWrong: oneOfType([string, number]),
  voiceQuestion: array,
  answered: bool,
};

function mapStateToProps(state) {
  return {
    whovoxGame: state.whovoxGame
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
)(GamePage);
