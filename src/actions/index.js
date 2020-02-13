import api from "../api";
import * as action from "../constants/actionTypes";

export const setGameId = (gameID) => ({
  type: action.NEW_GAME_LOAD, gameID
});

/**
 * Initiates the data load orchestration from the frontend.
 * Start with game ID and then load 5 answer IDs based on
 * category selections.
 *
 * @param {number} gameID ID of current whovox game
 * @param {number} answerID ID of current whovox game
 * @param {function} dispatch Redux's dispatch function
 */
export const startDataLoad = (gameID) => {

  return (dispatch) => {

    dispatch({ type: action.LOAD_GAME_DATA });

    return api.getNewGame(gameID)
      .then(newGameData => {

        // Something went wrong server-side
        if (newGameData.errored) {
          dispatch({ type: action.LOAD_GAME_FAILURE, error: "Server-side error on 'startDataLoad'." });
          return;
        }

        dispatch({ type: action.LOAD_GAME_SUCCESS, newGameData });

        return getVoices(newGameData, dispatch);
      })
      .catch( error => {
        dispatch({ type: action.LOAD_GAME_FAILURE, error });
      });

  };
};

/**
 * Second step in the REST call chain. Uses answer ID to get all 5 q's
 * worth of options for full game.
 *
 * (Export only intended for unit testing)
 *
 * @param {string} ansIDs The answer IDs to query against for options for all 5 Q's
 * @param {function} dispatch Redux's dispatch function
 */
export const getVoices = async (ansIDs, dispatch) => {
  dispatch({ type: action.LOAD_VOICES });

  try {
    let gameVoices = await api.loadGameVoices(ansIDs);
    // Something went wrong server-side
    if (gameVoices.errored) {
      dispatch({ type: action.LOAD_VOICES_FAILURE, error: "Server-side error on 'getVoices'." });
      return;
    }
    dispatch({ type: action.LOAD_VOICES_SUCCESS, gameVoices });
    dispatch({ type: action.SHUFFLE_CHOICES, gameVoices });
  }
  catch (error) {
    dispatch({ type: action.LOAD_VOICES_FAILURE, error });
  }
};




/*-------------------------------------------------------------------*/
/*********************** End of REST Chain ***************************/
/*-------------------------------------------------------------------*/




