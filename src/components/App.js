/* eslint-disable import/no-named-as-default */
import React from "react";
import {func} from 'prop-types';
import {connect} from 'react-redux';
//import { NavLink, Route, Switch } from 'react-router-dom';
//import AboutPage from './AboutPage';
import GamePage from './containers/GamePage';
//import HomePage from './HomePage';
//import NotFoundPage from './NotFoundPage';
//import { hot } from 'react-hot-loader';
//import {setGameId, startDataLoad} from '../actions';
import {getGameID} from '../actions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  componentDidMount() {
    this.props.getGameID();
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="App">
        <GamePage />
      </div>
    );
  }
}

App.propTypes = {
  // dispatchFn's
  getGameID: func,
};

const mapStateToProps = (state) => ({
  whovoxGame: state.whovoxGame,
});

export default connect(
  mapStateToProps,
  { // dispatch fn's
    getGameID,
  }
)(App);

