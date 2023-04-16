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
  }

  componentDidUpdate() {

    if(this.props.whovoxGame.clipPlaying && (interval === null)) {
      this.props.actions.startTimer();
      console.log('audio playing');
    }

    // timer start
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
      this.props.actions.clipPlayingFalse();
    }

  }

  timerClicked = () => {

    console.log('timerClicked...');

    //this.props.voxCount !== 4 ? this.props.actions.startTimer() : this.props.actions.startNextGame();

    // play audio, get clip ID from newGameData
    const clip3 = this.props.whovoxGame.newGameData || {};
    const clip2 = clip3[this.props.whovoxGame.voxCount] || '';
    const clipID = clip2.ID || '';
    let isPlaying = this.playIDBaudio(clipID);
    let isResolved = this.MakeQueryablePromise(isPlaying);
    if (isResolved) {
      console.log('timerClicked isResolved: ' + isResolved);
      this.props.actions.clipPlayingTrue();
      this.componentDidUpdate();
      //this.props.actions.startTimer();
    }

  }

  MakeQueryablePromise(promise) {
    // Don't create a wrapper for promises that can already be queried.
    if (promise.isResolved) return promise;
    let isResolved = false;
    let isRejected = false;
    // Observe the promise, saving the fulfillment in a closure scope.
    let result = promise.then(
       function(v) { isResolved = true; return v; },
       function(e) { isRejected = true; throw e; });
    result.isFulfilled = function() { return isResolved || isRejected; };
    result.isResolved = function() { return isResolved; }
    result.isRejected = function() { return isRejected; }
    return result;
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
          audio = new Audio(url);
          audio.play();
          //this.props.voxCount !== 4 ? this.props.actions.startTimer() : this.props.actions.startNextGame();
        }
        // close db
        transaction.oncomplete = function () {
          resolve(true);
          db.close();
        };
      }

      // safari ios special audio play code
      const ua = navigator.userAgent.toLowerCase();
      //console.log('ua: ' + ua);
      let isSafari = ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
      let isSafariiOS = ua.indexOf("mobile") > -1;
      if (isSafariiOS) {
        console.log('isSafari iOS hit');
        url = '';
        audio.autoplay = true;
        audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
        audio.play();
      }
      else if (isSafari && this.props.whovoxGame.voxCount == 0 && this.props.whovoxGame.ansCount == 0) {
        console.log('isSafari mac hit');
        url = '';
        audio = new Audio(url);
        audio.play();
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
  clipPlaying: bool,
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
    clipPlaying: state.whovoxGame.clipPlaying,
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
