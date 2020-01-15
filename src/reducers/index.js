import { combineReducers } from 'redux';
//import fuelSavings from './fuelSavingsReducer';
import whovoxGame from './whovoxGameReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  //fuelSavings,
  whovoxGame
});

export default rootReducer;
