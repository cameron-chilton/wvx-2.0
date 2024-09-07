import React, {Component} from 'react';
import {string, bool, object, number, oneOfType, array} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Timer from '../Timer';
import GameInfo from '../GameInfo';
import AnswerBtns from '../AnswerBtns';
import GameFirstDialog from '../GameFirstDialog';
import HallOfFame from '../HallOfFame';
import * as actions from '../../actions/whovoxActions';
import {VOICE_OF_URL, PRIVACY_POLICY_URL, GET_VOICE_COUNT} from '../../constants/DataURLs';

let interval = null;
let url = '';
let audio = new Audio();

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
    // custom event listener add
    document.body.addEventListener('canplaythrough', this.handleAudioPlaying.bind(this));
  }

  componentWillUnmount() {
    // custom event listener remove
    document.body.removeEventListener('canplaythrough', this.handleAudioPlaying.bind(this));
  }

  componentDidUpdate() {

    // timer start if timerOn and clipPlaying true
    if ( (this.props.whovoxGame.timerOn) && (interval === null)  ) {
      // set timer interval
      interval = setInterval( () => {
        this.props.actions.tickTimer(this.props.whovoxGame);
      });
    }
    // timer & audio stop
    if ( (!this.props.whovoxGame.timerOn) && (interval !== null) ) {
      audio.pause();
      clearInterval(interval);
      interval = null;
    }

  }

  // starts timer when audio begins
  handleAudioPlaying = (e) => {
    let isPlayingE = false;
    if (e && e.type == 'canplaythrough') {
      isPlayingE = true;
    }
    //console.log('is canplaythrough: ' + isPlayingE);
    if (isPlayingE && e) {
      console.log('playing true');
      this.props.actions.startTimer();
      console.log({audio})
    }
  };

  timerClicked = () => {
    console.log('timerClicked...');
    //console.log({e})
    this.props.actions.incrementVoxCount();
    // play audio, get clip ID from newGameData
    const clip3 = this.props.whovoxGame.newGameData || {};
    const clip2 = clip3[this.props.voxCount] || '';
    const clipID = clip2.ID || '';
    this.playIDBaudio(clipID);
  }

async playIDBaudio(clipID) {

  return new Promise( function(resolve, reject) {
      // open the database
      let indexedDB = window.indexedDB;
      const open = indexedDB.open('wvxDB', 1);

      // Generic error handler for all errors targeted at this DBs requests.
      open.onerror = function(event) {
        //console.error("Indexed DB error: " + event.target.errorCode);
        reject.error("Indexed DB error: " + event.target.errorCode);
      };

      // this event is only implemented in recent browsers
      open.onupgradeneeded = function () {
          const wvxDB = open.result;
          const store = wvxDB.createObjectStore('clips', { keyPath: 'id' });
          console.log(store);
      };

      // success
      open.onsuccess = function() {

        const db = open.result;
        const transaction = db.transaction('clips', 'readwrite');
        const store = transaction.objectStore('clips');
        const gid = store.get(clipID);

        gid.onsuccess = function(event) {

          const voiceQuestion = event.target.result;
          url = ('audio/' + voiceQuestion.dir + '/' + voiceQuestion.clipname + voiceQuestion.ext);
          // safari ios special audio play code
          const ua = navigator.userAgent.toLowerCase();
          let isSafari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
          let isSafariiOS = ua.indexOf("mobile") > -1;

          if (isSafariiOS) {
            console.log('isSafari iOS hit');
            //audio = new Audio(url);
            audio.src = url;
            //audio.load();
            audio.autoplay = true;
            audio.muted = false;
            audio.loop = false;
            audio.playsInline = true;
            audio.play();
            document.body.dispatchEvent(new CustomEvent('canplaythrough', audio));
          }
          else if (isSafari) {
            console.log('isSafari mac hit');
            audio = new Audio(url);
            audio.play();
            document.body.dispatchEvent(new CustomEvent('canplaythrough', audio));
          }
          else {
            console.log('default play');
            audio = new Audio(url);
            audio.play();
            document.body.dispatchEvent(new CustomEvent('canplaythrough', audio));
          }
        }
        // close db
        transaction.oncomplete = function () {
          resolve(true);
          db.close();
        };
      }
    })
  }

  getQueryVariable = () => {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
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
              timerClicked={this.timerClicked}
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
              <div className="voiceDiv"><a href={VOICE_OF_URL} className="voiceLink">VOICE OF?</a>
            </div>
              <div className="hofDiv">{!timerOn ? <a href="#" className="hofLink" onClick={this.isHOFclick}>HALL OF FAME</a> : <span className="hofOff">HALL OF FAME</span>}</div>
            </div>
            <div className="copy">
              <div><a href={PRIVACY_POLICY_URL} className="privPolicy">PRIVACY POLICY</a></div>
              <div className="copyright">&copy;2024 THINKAGAIN</div>
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
    whovoxGame: state.whovoxGame,
    voxCount: state.whovoxGame.voxCount,
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
