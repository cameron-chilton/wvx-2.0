import api from "../api";
import * as action from "../constants/actionTypes";

/**
 * Part of the initial bootstraping of the app.
 * Sets the Game ID to the Redux store.
 *
 * @param {number} gameID Individual game
 */

export const setGameId = (gameID) => ({
  type: action.NEW_GAME_LOAD, gameID
});

/**
 * Initiates the data load orchestration from the frontend.
 *
 * @param {number} gameID ID of current whovox game
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



        //return getVetIcn(consult, dispatch, gameID);
      })
      //.catch( error => {
        //dispatch({ type: action.CONSULT_INFO_FAILURE, error });
      //});

  };
};




/*-------------------------------------------------------------------*/
/*********************** End of REST Chain ***************************/
/*-------------------------------------------------------------------*/



