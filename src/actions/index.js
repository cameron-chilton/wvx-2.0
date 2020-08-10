import api from '../api';
import * as action from '../constants/actionTypes';

export const getGameID = () => {
  return (dispatch) => {
    dispatch({ type: action.NEW_GAME_ID_LOAD });
    return api.getNextGameID()
      .then(id => {
        // Something went wrong server-side
        if (id.errored) {
          dispatch({ type: action.LOAD_GAME_ID_FAILURE, error: "Server-side error on 'getGameID'." });
          return;
        }
        dispatch({ type: action.LOAD_GAME_ID_SUCCESS, id });
        return startDataLoad(id, dispatch);
      })
      .catch( error => {
        dispatch({ type: action.LOAD_GAME_ID_FAILURE, error });
      });
  };
};

/////////////////// LOAD GAME ANSWERS II /////////////////////

export const startDataLoad = async (id, dispatch) => {
  dispatch({ type: action.LOAD_GAME_DATA });

  try {
    let newGameData = await api.getNewGame(id);
    // Something went wrong server-side
    if (newGameData.errored) {
      dispatch({ type: action.LOAD_VOICES_FAILURE, error: "Server-side error on 'loadVoiceQuestion'." });
      return;
    }
    dispatch({ type: action.LOAD_GAME_SUCCESS, newGameData });
    return loadGameClips(newGameData, dispatch);
  }
  catch (error) {
    dispatch({ type: action.LOAD_GAME_FAILURE, error });
  }
};

/////////////////// PRELOAD VOICE CLIPS  /////////////////////

export const loadGameClips = async (newGameData, dispatch) => {
  dispatch({ type: action.LOAD_GAME_CLIPS });

  try {
    let newGameClips = await api.getGameClips(newGameData);
    // Something went wrong server-side
    if (newGameClips.errored) {
      dispatch({ type: action.LOAD_CLIPS_FAILURE, error: "Server-side error on 'loadGameClips'." });
      return;
    }
    dispatch({ type: action.LOAD_CLIPS_SUCCESS, newGameClips });
    return getFirstQuestion(newGameData, dispatch);
  }
  catch (error) {
    dispatch({ type: action.LOAD_CLIPS_FAILURE, error });
  }
};

/////////////////// GET FIRST VOICE QUESTION /////////////////////

export const getFirstQuestion = async (newGameData, dispatch) => {
  dispatch({ type: action.LOAD_VOICES });

  try {
    let voiceQuestion = await api.loadVoiceQuestion(newGameData);
    // Something went wrong server-side
    if (voiceQuestion.errored) {
      dispatch({ type: action.LOAD_VOICES_FAILURE, error: "Server-side error on 'loadVoiceQuestion'." });
      return;
    }
    dispatch({ type: action.LOAD_VOICES_SUCCESS, voiceQuestion });
    dispatch({ type: action.SHUFFLE_CHOICES, voiceQuestion });
  }
  catch (error) {
    dispatch({ type: action.LOAD_VOICES_FAILURE, error });
  }
};

