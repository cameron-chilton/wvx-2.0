
import initialState from './initialState';
import {
  NEW_GAME_LOAD,
  NEW_GAME_ID_LOAD,
  LOAD_GAME_DATA,
  LOAD_GAME_SUCCESS,
  LOAD_GAME_FAILURE,
  LOAD_GAME_ID_SUCCESS,
  LOAD_GAME_ID_FAILURE,
  START_TIMER,
  STOP_TIMER,
  TICK_TIMER,
  OUT_OF_TIME,
  CLICK_ANSWER,
  CHECK_ANSWER,
  TOGGLE_CATEGORY,
  LOAD_VOICES,
  LOAD_VOICES_SUCCESS,
  LOAD_VOICES_FAILURE,
  LOAD_CLIPS,
  LOAD_CLIPS_SUCCESS,
  LOAD_CLIPS_FAILURE,
  SHUFFLE_CHOICES,
  LOAD_VOICES_ALL_GAME,
  LOAD_VOICES_ALL_GAME_SUCCESS,
  LOAD_VOICES_ALL_GAME_FAILURE,
  SHUFFLE_CHOICES_ALL_GAME,
  PREP_NEXT_QUESTION,
  GAME_OVER,
  START_NEXT_GAME,
  LOAD_NEXT_GAME_ID_SUCCESS,
  LOAD_NEXT_GAME_ID_FAILURE,
  IS_FROM_HOF_CLICK,
} from '../constants/actionTypes';
import utils from '../utils/math-utils';
import whovoxUtils from '../utils/whovox-utils';
import objectAssign from 'object-assign';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.

export default function whovoxGameReducer(state=initialState.whovoxGame, action) {

  let newState;

  switch (action.type) {

      /////////////////// LOAD GAME DATA II /////////////////////////

      case NEW_GAME_ID_LOAD:
        return {
          ...state,
          id: action.id,
          btnTxt: 'LOADING...',
          loading: true,
        };

      case LOAD_GAME_ID_SUCCESS: {
        const {...rest} = action.id;
        return {
          ...state,
          ...rest,
          loading: true,
        };
      }

      case LOAD_GAME_ID_FAILURE:
        return {
          ...state,
          error: action.error
        };

      case LOAD_GAME_DATA:
        return {
          ...state,
          loading: true,
          btnTxt: 'LOADING...',
          newGameData: action.newGameData
        };

      /////////////////// LOAD GAME DATA /////////////////////////

        case NEW_GAME_LOAD:
          return {
             ...state,
            id: action.gameID
          };

        case LOAD_GAME_SUCCESS: {
          const { ...rest } = action.newGameData;
          return {
            ...state,
            ...rest,
            loading: false,
          };
        }

        case LOAD_GAME_FAILURE:
          return {
            ...state,
            error: action.error
          };

        /////////////////// LOAD GAME CLIPS /////////////////////////

        case LOAD_CLIPS:
          return {
             ...state,
             loading: true,
             btnTxt: 'LOADING...',
          };

        case LOAD_CLIPS_SUCCESS: {
          return {
            ...state,
            loading: false,
            btnTxt: '',
          };
        }

        case LOAD_CLIPS_FAILURE:
          return {
            ...state,
            error: action.error
          };

        ///////////////// INITAL LOAD VOICE QUESTIONS FOR GAME //////////////////////

        case LOAD_VOICES:
          return {
            ...state,
            loading: true,
            btnTxt: 'LOADING...',
            voiceQuestion: action.voiceQuestion
          };

        case LOAD_VOICES_SUCCESS: {
          const { ...rest } = action.voiceQuestion;
          return {
            ...state,
            ...rest,
            loading: false,
            btnTxt: 'START WHOVOX',
          };
        }

        case LOAD_VOICES_FAILURE:
          return {
            ...state,
            error: action.error
          };

        // SHUFFLE QUESTION ARRAY
        case SHUFFLE_CHOICES: {
          newState = objectAssign({}, state);
          newState.voiceQuestion = state.voiceQuestion || [];
          newState = {
            ...state,
            voiceQuestion: utils.shuffle(newState.voiceQuestion),
          }
          return newState;
        }

    //////////////////////// TIMER ACTIONS /////////////////////////

    case START_TIMER:
      newState = objectAssign({}, state);
      newState.voiceQuestion = (state.ansCount === 0) ? state.voiceQuestion : state.nextQuestion;
      (state.voxCount !== 4) ? (
        newState = {
          ...state,
          timerOn: true,
          offset: action.offset,
          btnTxt: state.timer,
          voxCount: (state.score === 0) ? (0) : (state.voxCount + 1),
          timer: 10000,
          voiceQuestion: newState.voiceQuestion,
          outOfTime: false,
          answered: false,
        }
      ) : (
        newState = {
          loading: false,
          score: 0,
          voxCount: 0,
          ansCount: 0,
          btnTxt: 'START GAME',
          timerOn: false,
          answered: false,
          outOfTime: false,
          gameOver: false,
          timer: 10000,
          ansRight: 0,
          ansWrong: 0,
          newGameData: [],
          nextQuestion: [],
          voiceQuestion: [],
        }
      )

    return newState;

    case STOP_TIMER:
      return {
        ...state,
        timerOn: false,
        timer: state.timer,
        offset: undefined
      };

    ////////// NO ANSWER, OUT OF TIME ///////////

    case OUT_OF_TIME:
      return {
        ...state,
        score: (state.score - 250),
        ansWrong: state.ansWrong + 1,
        ansCount: state.ansCount + 1,
        answered: true,
      };

    ////////// TIMER IS TICKED EACH MS ///////////

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
          (state.timer > 0) ? (state.timer) : (newState.btnTxt = 'OUT OF TIME! -250')
        ),
        outOfTime: (
          (state.timer > 0) ? false : true
        )
      };

    //////////////// LOAD FINAL 4 QUESTIONS FOR GAME /////////////////

    case LOAD_VOICES_ALL_GAME:
      return {
        ...state,
        loading: true,
        nextQuestion: action.nextQuestion
      };

    case LOAD_VOICES_ALL_GAME_SUCCESS: {
      //console.log('LOAD_VOICES_ALL_GAME_SUCCESS: ' + JSON.stringify(action.nextQuestion));
      const { ...rest } = action.nextQuestion;
      return {
        ...state,
        ...rest,
        loading: false,
      };
    }

    case LOAD_VOICES_ALL_GAME_FAILURE:
      return {
        ...state,
        error: action.error
      };

    // SHUFFLE QUESTION ARRAY ALL GAME
    case SHUFFLE_CHOICES_ALL_GAME: {
      newState = objectAssign({}, state);
      newState.nextQuestion = state.nextQuestion || [];
      newState = {
        ...state,
        nextQuestion: utils.shuffle(newState.nextQuestion),
      }
      return newState;
    }

    /////////////////// CHECK ANSWER WHEN CLICKED ///////////////////

    case CLICK_ANSWER:
      return {
        ...state,
        timerOn: false,
        timer: state.timer,
        offset: undefined,
        btnTxt: whovoxUtils.formatTime(state.timer),
        answered: true,
        ansCount: state.ansCount + 1,
        loading: true,
    };

    case CHECK_ANSWER: {
      newState = objectAssign({}, state);
      const voxScore = Math.round(state.timer / 10);
      const answeredRight = (action.id === state.newGameData[state.voxCount].ID);
      //console.log('clicked ID: ' + action.id);
      //console.log('ansID' + state.voxCount + ': ' + state.newGameData[state.voxCount].ID);
      //console.log('answeredRight: ' + answeredRight);
      answeredRight ? (
        newState = {
          ...state,
          btnTxt: 'RIGHT! +' + voxScore,
          score: state.score + voxScore,
          ansRight: state.ansRight + 1,
        }
      ) : (
        newState = {
          ...state,
          btnTxt: 'WRONG! -250',
          score: (state.score - 250),
          ansWrong: state.ansWrong + 1,
        }
      )
      return newState;
    }

    case PREP_NEXT_QUESTION:
        return {
          ...state,
          btnTxt: 'NEXTVOX',
          loading: false,
    };

    case GAME_OVER:
        return {
          ...state,
          btnTxt: 'GAME OVER',
          loading: false,
          gameOver: true,
    };

    ////////// SET IS FROM HALL OF FAME CLICK VAR ///////////

    case IS_FROM_HOF_CLICK:
      return {
        ...state,
        showHOF: true,
        gameOver: true,
      };

    //////////////// START NEXT GAME /////////////////

    case START_NEXT_GAME:
      return {
        ...state,
        loading: true,
        id: action.id
      };

    case LOAD_NEXT_GAME_ID_SUCCESS: {
      const { ...rest } = action.id;
      return {
        ...state,
        loading: false,
        score: 0,
        voxCount: 0,
        ansCount: 0,
        btnTxt: 'START GAME',
        showHOF: false,
        timerOn: false,
        answered: false,
        outOfTime: false,
        gameOver: false,
        timer: 10000,
        ansRight: 0,
        ansWrong: 0,
        newGameData: [],
        nextQuestion: [],
        voiceQuestion: [],
        ...rest,
      };
    }

    case LOAD_NEXT_GAME_ID_FAILURE:
      return {
        ...state,
        error: action.error
      };

    // CATEGORY SELECTIONS
    case TOGGLE_CATEGORY: {

      if (action.value === 'Movies/TV') {
        newState = {
          ...state,
          movTvChecked: state.movTvChecked ? false : true,
          categories: (
            (state.movTvChecked)
              ? whovoxUtils.arrayRemove(state.categories, action.value)
              : [...state.categories, action.value]
          ),
        }
      }
      if (action.value === 'Music/Arts') {
        newState = {
          ...state,
          musArtsChecked: state.musArtsChecked ? false : true,
          categories: (
            (state.musArtsChecked)
              ? whovoxUtils.arrayRemove(state.categories, action.value)
              : [...state.categories, action.value]
          ),
        }
      }
      if (action.value === 'News/Politics') {
        newState = {
          ...state,
          newsPolChecked: state.newsPolChecked ? false : true,
          categories: (
            (state.newsPolChecked)
              ? whovoxUtils.arrayRemove(state.categories, action.value)
              : [...state.categories, action.value]
          ),
        }
      }
      if (action.value === 'Sports') {
        newState = {
          ...state,
          sportsChecked: state.sportsChecked ? false : true,
          categories: (
            (state.sportsChecked)
              ? whovoxUtils.arrayRemove(state.categories, action.value)
              : [...state.categories, action.value]
          ),
        }
      }
      return newState;
    }

    default:
      return state;
  }
}
