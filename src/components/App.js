/* eslint-disable import/no-named-as-default */
import React from "react";
import {string, func} from 'prop-types';
import { connect } from 'react-redux';
//import { NavLink, Route, Switch } from 'react-router-dom';
//import AboutPage from './AboutPage';
import GamePage from './containers/GamePage';
//import HomePage from './HomePage';
//import NotFoundPage from './NotFoundPage';
//import { hot } from 'react-hot-loader';
import {
  setGameId,
  startDataLoad,
} from '../actions';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  componentDidMount() {
    const {gameIdFromUri} = this.props;
    this.props.setGameId(gameIdFromUri);
    this.props.startDataLoad(gameIdFromUri);
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div className="App">
        <GamePage  />
        {/*
        <div>
          <NavLink exact to='/'>Home</NavLink>
          {' | '}
          <NavLink to='/about'>About</NavLink>
        </div>
        <Switch>
          <Route path='/' component={GamePage} gameIdFromUri={gameIdFromUri} />
          <Route path='/about' component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
        */}
      </div>
    );
  }
}

App.propTypes = {
  gameIdFromUri: string.isRequired,
  // dispatchFn's
  setGameId: func,
  startDataLoad: func,
};

const mapStateToProps = (state) => ({
  whovoxGame: state.whovoxGame,
});

export default connect(
  mapStateToProps,
  { // dispatch fn's
    setGameId,
    startDataLoad,
  }
)(App);


{/*
export default hot(module)(connect(
  mapStateToProps,
    { // dispatch fn's
      setGameId,
      startDataLoad,
    }
  )(App));
  */}

//export default hot(module)(App);

//export default hot(module)(connect()(Test));
