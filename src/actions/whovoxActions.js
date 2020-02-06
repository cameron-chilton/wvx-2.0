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

// TIMER ACTIONS
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

// ANSWER BUTTONS
export function clickAnswer() {
  return function (dispatch) {
    return dispatch({
      type: types.CLICK_ANSWER,
    });
  };
}

// CATEGORY SELECTION
export function catCheckHandler(value) {
  return function (dispatch) {
    return dispatch({
      type: types.TOGGLE_CATEGORY,
      value
    });
  };
}


