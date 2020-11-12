import React, {Component} from "react";
import {string, bool, object, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HallOfFame from './HallOfFame';
import * as actions from '../actions/whovoxActions';

class GameOver extends Component {

  constructor() {
    super();
    this.saveGame = this.saveGame.bind(this);
    this.state = {
      playerName: localStorage.getItem('Player Name') || '',
      playerLocation: localStorage.getItem('Player Location') || '',
      isValid: true,
      gameSaved: false,
    };
    this.nameRef = React.createRef() || '';
    this.locRef = React.createRef() || '';
  }

  componentDidMount() {
    this.audio = new Audio();
    let gameSfx;
    // can play ogg or mp3
    if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
      gameSfx = localStorage.getItem('Game_Over', 'https://whovox.com/audio/_sfx/Game_Over.ogg');
      this.audio = new Audio(gameSfx);
      }
    else {
      gameSfx = localStorage.getItem('Game_Over', 'https://whovox.com/audio/_sfx/Game_Over.mp3');
      this.audio = new Audio(gameSfx);
      }
    this.audio.play();
  }

  handleName = (event) => {
    if(event.target.value.match("^[a-zA-Z- ]*$")!=null) {
      this.setState({ playerName: event.target.value }, () => {
        localStorage.setItem('Player Name', this.state.playerName);
      })
    }
  }

  handleLocation = (event) => {
    if(event.target.value.match("^[a-zA-Z, ]*$")!=null) {
      this.setState({ playerLocation: event.target.value }, () => {
        localStorage.setItem('Player Location', this.state.playerLocation);
      })
    }
  }

  saveGame = () => {
    const gameObj = {
      id: this.props.id,
      name: this.state.playerName,
      location: this.state.playerLocation,
      score: this.props.score
    }
    if (this.state.playerName === '' || this.state.playerLocation === '') {
      this.setState({isValid: false});
      if (this.state.playerName === '') {
        this.nameRef.current.focus();
      }
      else {
        if (this.state.playerLocation === '') {
          this.locRef.current.focus();
        }
      }
    }
    else {
      this.setState({isValid: true});
      this.props.actions.saveGame(gameObj);
      this.setState({gameSaved: true});
      this.setState({playerName: this.state.playerName});
      this.setState({playerLocation: this.state.playerLocation});
    }

  }

  render() {
    const {score, ansRight} = this.props;
    return (
      <div className="">
        {
          (!this.state.gameSaved) ? (

            (score > 499) ? (
              <div className="inHOF">
                <h2>THANKS FOR PLAYING!</h2>
                <p>You scored <span className="bold">{score.toLocaleString()}</span> with <span className="bold">{ansRight}</span> out of <span className="bold">5</span> voices correct.</p>
                <p>Enter your name and location to save your game and find your place in the Hall of Fame.</p>
                <p>Use the flashing checkboxes above to select different categories!</p>
                <h3><span className="bold"><a href="https://whovox.com">PLAY AGAIN!</a></span></h3>

                {!this.state.isValid && <div className="errorMsg">Name and Location is required to save game.</div>}

                <div className="gameOverForm">
                  <div className="field">
                    <label htmlFor="player_name">PLAYER NAME</label>
                    <input id="player_name" type="text" placeholder="Player Name" value={this.state.playerName} onChange={this.handleName} ref={this.nameRef} maxLength="32" />
                  </div>
                  <div className="field">
                    <label htmlFor="player_location">LOCATION</label>
                    <input id="player_location" type="text" placeholder="Earth" value={this.state.playerLocation} onChange={this.handleLocation} ref={this.locRef} maxLength="32" />
                  </div>
                  <div className="button">
                    <button className="save-button" id="save-buttonID" onClick={this.saveGame}>SAVE GAME</button>
                  </div>
                </div>

              </div>

            ) : (
              <div className="tooLow">
                <h2>THANKS FOR PLAYING!</h2>
                <p>Your score is too low for the Hall of Fame.</p>
                <h3><span className="bold"><a href="https://whovox.com">TRY AGAIN!</a></span></h3>
                <p>Use the flashing checkboxes above to select different categories!</p>
              </div>
            )

          ) : (
            <HallOfFame gameID={this.props.id} />
          )
        }
      </div>
    );
  }
}

GameOver.propTypes = {
  actions: object,
  whovoxGame: object,
  gameOver: bool,
  score: oneOfType([string, number]),
  id: oneOfType([string, number]),
  ansRight: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    id: state.whovoxGame.id,
    score: state.whovoxGame.score,
    gameOver: state.whovoxGame.gameOver,
    ansRight: state.whovoxGame.ansRight,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOver);
