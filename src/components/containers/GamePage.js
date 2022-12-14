import React, {Component} from 'react';
import {string, bool, object, number, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';
import GameFirstDialog from '../GameFirstDialog';
import HallOfFame from '../HallOfFame';
//import StartGameButton from '../StartGameButton';
import * as actions from '../../actions/whovoxActions';
import {VOICE_OF_URL, PRIVACY_POLICY_URL, GET_VOICE_COUNT} from '../../constants/DataURLs';

let interval = null;
class GamePage extends Component {

  constructor() {
    super();
    this.state = {
      voiceCount: '',
      isFirstGame: localStorage.getItem('First Game', false) ? false : true,
    };
    this.isHOFclick = this.isHOFclick.bind(this);
  }

  componentDidMount() {
    setTimeout( () => {
      fetch(GET_VOICE_COUNT)
        .then(response => response.json())
        .then(data => this.setState({voiceCount: data}));
        this.getQueryVariable();
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
      let gameAudio;

      // can play ogg or mp3
      if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
        gameAudio = localStorage.getItem(clip, 'audio/' + dir + '/' + gameAudio + '.ogg');
        this.audio = new Audio(gameAudio);
        }
      else {
        gameAudio = localStorage.getItem(clip, 'audio/' + dir + '/' + gameAudio + '.mp3');
        this.audio = new Audio(gameAudio);
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

  getQueryVariable = () => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
        if(pair[0] == 'showHallOfFame'){
          this.props.actions.toggleHallfOfFame();
          }
        }
      return(false);
}

  isHOFclick = () => {
    this.props.actions.toggleHallfOfFame();
  }

  isFirstGame = () => {
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
      outOfTime,
      showHOF
    } = this.props;

    return (
      <>
        <div className="game">
          {this.state.isFirstGame && <GameFirstDialog isFirstGame={this.isFirstGame} />}
          <div className="topLine">
            <h1>
              <span className="name1">W</span>
              <span className="name2">H</span>
              <span className="name3">O</span>
              <span className="name4">V</span>
              <span className="name5">O</span>
              <span className="name6">X</span>
            </h1>
            <div className="earLogo">
              <img className="logo-dot" src="https://whovox.com/imgs/logo-dot.svg" />
              <img className="logo-outer" src="https://whovox.com/imgs/logo-outer.svg" />
              <img className="logo-inner1" src="https://whovox.com/imgs/logo-inner1.svg" />
              <img className="logo-inner2" src="https://whovox.com/imgs/logo-inner2.svg" />
              <img className="logo-inner3" src="https://whovox.com/imgs/logo-inner3.svg" />
            </div>
            <div className="voiceCount">
              <div className="voiceNum">{vxCt.toLocaleString()}</div>
              <div className="voiceTxt">VOICES</div>
            </div>
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
              showHOF={showHOF}
            />
            {!showHOF ?
              <AnswerBtns
                timerOn={timerOn}
                voiceQuestion={voiceQuestion}
                answered={answered}
                newGameData={newGameData}
                ansCount={ansCount}
                voxCount={voxCount}
                outOfTime={outOfTime}
              /> : <HallOfFame />
            }
          </div>
          <div className="bottomLinks">
            <div className="links">
              <div className="voiceDiv"><a href={VOICE_OF_URL} className="voiceLink">VOICE OF?</a></div>
              <div className="hofDiv">{!timerOn ? <a href="#" className="hofLink" onClick={this.isHOFclick}>HALL OF FAME</a> : <span className="hofOff">HALL OF FAME</span>}</div>
            </div>
            <div className="copy">
              <div><a href={PRIVACY_POLICY_URL} className="privPolicy">PRIVACY POLICY</a></div>
              <div className="copyright">&copy;2023 THINKAGAIN</div>
            </div>
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
  showHOF: bool,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
    showHOF: state.whovoxGame.showHOF,
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
