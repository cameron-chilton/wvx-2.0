import React, {Component} from 'react';
import {func, object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/whovoxActions';
class GameFirstDialog extends Component {

  constructor() {
    super();
    this.clickTimer = this.clickTimer.bind(this);
  }

  clickTimer = () => {
      this.timeout = setTimeout( () => {
          this.props.timerClicked();
      }, 200)
  }

  render() {
    return (
      <div className="overlayContent">
        <h1>WHOVOX</h1>
        <h2>VOICE RECOGNITION GAME</h2>
        <h3>TURN SOUND ON!</h3>
        <ol>
          <li>Press PLAY</li>
          <li>Pick Who Is Talking</li>
          <li>Press NEXTVOX for Next Voice</li>
        </ol>
        <p><button className="save-button" onClick={ () => {this.props.isFirstGame(); this.clickTimer();} }>PLAY</button></p>
      </div>
    );
  }
}

GameFirstDialog.propTypes = {
  actions: object,
  isFirstGame: func,
  timerClicked: func,
};

function mapStateToProps(state) {
  return {
    timerOn: state.whovoxGame.timerOn,
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
)(GameFirstDialog);

//export default GameFirstDialog;
