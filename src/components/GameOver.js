import React, {Component} from "react";
import {string, bool, object, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HallOfFame from './HallOfFame';
import * as actions from '../actions/whovoxActions';

class GameOver extends Component {

  componentDidMount() {
    (this.props.score > 0) && this.nameRef.current.focus();
  }

  componentDidUpdate() {
  }

  constructor() {
    super();
    this.saveGame = this.saveGame.bind(this);
    this.state = {
      playerName: '',
      playerLocation: '',
      isValid: true,
      gameSaved: false
    };
    this.nameRef = React.createRef();
    this.locRef = React.createRef();
  }

  handleName = (event) => {
    this.setState({playerName: event.target.value});
  }

  handleLocation = (event) => {
    this.setState({playerLocation: event.target.value});
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
    }

  }

  render() {
    const {score, ansRight} = this.props;
    return (
      <div className="">
        {
          (!this.state.gameSaved) ? (

            (score > 0) ? (
              <>
                <h3>THANKS FOR PLAYING!</h3>
                <p>You scored {score.toLocaleString()} with {ansRight} out of 5 voices correct.</p>
                <p>Enter your name and location to save your game and find your place in the Hall of Fame.</p>

                {!this.state.isValid && <p className="errorMsg">Player Name and Player Location input is required to save game.</p>}

                <div>
                  <label htmlFor="player_name" className="gameOverForm">Name</label>
                  <input id="player_name" type="text" placeholder="Player Name" value={this.state.playerName} onChange={this.handleName} ref={this.nameRef} maxLength="27" />
                </div>
                <div>
                  <label htmlFor="player_location" className="gameOverForm">Location</label>
                  <input id="player_location" type="text" placeholder="Earth" value={this.state.playerLocation} onChange={this.handleLocation} ref={this.locRef} maxLength="27" />
                </div>
                <div>
                  <button className="save-button" onClick={this.saveGame}>Save Game</button>
                </div>
              </>

            ) : (
              <>
                <h3>THANKS FOR PLAYING!</h3>
                <p>Your score is too low for the Hall of Fame. Try again!</p>
              </>
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
