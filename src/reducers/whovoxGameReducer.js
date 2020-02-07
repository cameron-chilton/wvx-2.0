
import initialState from './initialState';
import {
  NEW_GAME_LOAD,
  LOAD_GAME_DATA,
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
  CLICK_ANSWER,
  TOGGLE_CATEGORY,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  LOAD_VOICES,
  LOAD_VOICES_SUCCESS,
  LOAD_VOICES_FAILURE,
  RENDER_VOICES,
} from '../constants/actionTypes';
import objectAssign from 'object-assign';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function whovoxGameReducer(state=initialState.whovoxGame, action) {

  let newState;

  switch (action.type) {

    // LOAD GAME DATA
    case NEW_GAME_LOAD:
      return {
         ...state,
        id: action.gameID
      };

    case LOAD_GAME_DATA:
      return {
        ...state,
        loading: true,
        ansIDs: action.ansIDs
      };

    case LOAD_GAME_SUCCESS: {
      const { ...rest } = action.newGameData;
      return {
        ...state,
        ...rest,
        loading: false
      };
    }

    case LOAD_GAME_FAILURE:
      return {
        ...state,
      };

    // LOAD VOICE QUESTIONS FOR GAME
    case LOAD_VOICES:
      return {
        ...state,
        loading: true,
        gameVoices: action.gameVoices
      };

    case LOAD_VOICES_SUCCESS: {
      const { ...rest } = action.gameVoices;
      return {
        ...state,
        ...rest,
        loading: false
      };
    }

    case LOAD_VOICES_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case RENDER_VOICES:
      return {
        ...state,
      };

    // TIMER ACTIONS
    case START_TIMER:
      return {
        ...state,
        timerOn: true,
        offset: action.offset,
        btnTxt: state.timer
      };

    case STOP_TIMER:
      return {
        ...state,
        timerOn: false,
        timer: state.timer,
        offset: undefined
      };

    // TIMER IS TICKED EACH MS
    case TICK_TIMER:
      newState = objectAssign({}, state);
      return {
        ...state,
        timer: (
          (state.timer > 0) ? (state.timer - (action.timer - state.offset)) : (newState.timer = 0)
        ),
        offset: (
          (state.timer > 0) ? (action.timer) : (undefined)
        ),
        timerOn: (
          (state.timer > 0) ? (newState.timerOn = true) : (newState.timerOn = false)
        ),
        btnTxt: (
          (state.timer > 0) ? (state.timer) : (newState.btnTxt = 'OUT OF TIME')
        ),
      };

      // ANSWER IS CLICKED
      case CLICK_ANSWER:
        return {
          ...state,
          timerOn: false,
          timer: state.timer,
          offset: undefined,
          btnTxt: state.timer
      };

      // CATEGORY SELECTIONS
      case TOGGLE_CATEGORY: {
        if (action.value === 'Movies/TV') {
          newState = {
            ...state,
            movTvChecked: state.movTvChecked ? false : true,
          }
        }
        if (action.value === 'Music/Arts') {
          newState = {
            ...state,
            musArtsChecked: state.musArtsChecked ? false : true,
          }
        }
        if (action.value === 'News/Politics') {
          newState = {
            ...state,
            newsPolChecked: state.newsPolChecked ? false : true,
          }
        }
        if (action.value === 'Sports') {
          newState = {
            ...state,
            sportsChecked: state.sportsChecked ? false : true,
          }
        }
        return newState;
      }

    /*
    case CALCULATE_FUEL_SAVINGS:
      newState = objectAssign({}, state);
      newState[action.fieldName] = action.value;
      newState.necessaryDataIsProvidedToCalculateSavings = necessaryDataIsProvidedToCalculateSavings(newState);
      newState.dateModified = action.dateModified;

      if (newState.necessaryDataIsProvidedToCalculateSavings) {
        newState.savings = calculateSavings(newState);
      }

      return newState;
    */

    default:
      return state;
  }
}
