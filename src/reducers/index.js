import { combineReducers } from 'redux';
import whovoxGame from './whovoxGameReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  whovoxGame
});

export default rootReducer;
