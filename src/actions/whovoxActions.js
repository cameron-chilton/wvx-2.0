import api from '../api';
import * as types from '../constants/actionTypes';
import {getFormattedDateTime} from '../utils/dates';

// example of a thunk using the redux-thunk middleware
export function saveFuelSavings(settings) {
  return function (dispatch) {
    // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
    // in this case at this point we could call a service that would persist the fuel savings
    return dispatch({
      type: types.SAVE_FUEL_SAVINGS,
      dateModified: getFormattedDateTime(),
      settings
    });
  };
}

export function calculateFuelSavings(settings, fieldName, value) {
  return {
    type: types.CALCULATE_FUEL_SAVINGS,
    dateModified: getFormattedDateTime(),
    settings,
    fieldName,
    value
  };
}

/////////////////// TIMER ACTIONS /////////////////////

export function startTimer() {
  return function (dispatch) {
    return dispatch({
      type: types.START_TIMER,
      offset: Date.now()
    });
  };
}

export function stopTimer() {
  return function (dispatch) {
    return dispatch({
      type: types.STOP_TIMER,
    });
  };
}

export function tickTimer() {
  return function (dispatch) {
    return dispatch({
      type: types.TICK_TIMER,
      timer: Date.now()
    });
  };
}

//////////////// NO ANSWER, OUT OF TIME ////////////////

export function outOfTime() {
  return function (dispatch) {
    return dispatch({
      type: types.OUT_OF_TIME
    });
  };
}

//////////////// ANSWER BUTTONS ARE CLICKED ////////////////

export function clickAnswer() {
  return function (dispatch) {
    return dispatch({
      type: types.CLICK_ANSWER,
    });
  };
}

export function checkAnswer(id) {
  return function (dispatch) {
    return dispatch({
      type: types.CHECK_ANSWER,
      id
    });
  };
}

///////////////// PREP NEXT QUESTION FOR PLAYER //////////////

export function prepNextQuestion() {
  return function (dispatch) {
    return dispatch({
      type: types.PREP_NEXT_QUESTION,
    });
  };
}

//////////////////////// GAME OVER, SAVE GAME ///////////////////////////

export function gameOver() {
  return function (dispatch) {
    return dispatch({
      type: types.GAME_OVER,
    });
  };
}

export function saveGame(gameData) {
  return function (dispatch) {

    dispatch({ type: types.SAVE_GAME });
    return api.saveFinishedGame(gameData)
      .then(gameRank => {
        // Something went wrong server-side
        if (gameRank.errored) {
          dispatch({ type: types.SAVE_GAME_FAILURE, error: "Server-side error on 'saveGame'." });
          return;
        }
        dispatch({ type: types.SAVE_GAME_SUCCESS, gameRank });
      })
      .catch( error => {
        dispatch({ type: types.SAVE_GAME_FAILURE, error });
      });
  };
}

/////////////////////// START NEXT GAME ////////////////////////

export function startNextGame() {
  return function (dispatch) {

    dispatch({ type: types.START_NEXT_GAME });
    return api.getNextGameID()
      .then(id => {
        // Something went wrong server-side
        if (id.errored) {
          dispatch({ type: types.LOAD_NEXT_GAME_ID_FAILURE, error: "Server-side error on 'getNextGameID'." });
          return;
        }
        dispatch({ type: types.LOAD_NEXT_GAME_ID_SUCCESS, id });
      })
      .catch( error => {
        dispatch({ type: types.LOAD_NEXT_GAME_ID_FAILURE, error });
      });

  };
}

/////////// GET EACH QUESTION 1-4 AFTER INITAL LOAD ///////////

export function loadVoicesAllGame(newGameData, ansCount) {
  return function (dispatch) {

    dispatch({ type: types.LOAD_VOICES_ALL_GAME });
    return api.getNextQuestion(newGameData, ansCount)
      .then(nextQuestion => {
        // Something went wrong server-side
        if (nextQuestion.errored) {
          dispatch({ type: types.LOAD_VOICES_ALL_GAME_FAILURE, error: "Server-side error on 'loadVoicesAllGame'." });
          return;
        }
        dispatch({ type: types.LOAD_VOICES_ALL_GAME_SUCCESS, nextQuestion });
        dispatch({ type: types.SHUFFLE_CHOICES_ALL_GAME, nextQuestion });
      })
      .catch( error => {
        dispatch({ type: types.LOAD_VOICES_ALL_GAME_FAILURE, error });
      });

  };
}

/////////////// CATEGORY SELECTION ///////////////////

export function catCheckHandler(value) {
  return function (dispatch) {
    return dispatch({
      type: types.TOGGLE_CATEGORY,
      value
    });
  };
}
