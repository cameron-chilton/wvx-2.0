import axios from "axios";
//import { GET_NEWGAME, GET_ANSWERS } from '../constants/DataURLs';
// import queryString from "qs";
//import * as errors from "../constants/ErrorTypes";

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "http://localhost/WVX-2.0/src/php/",
});

class LiveApi {

  /**
   * Initial data load for everything.
   *
   * @param {string} gameID whovox game ID
   */
  static getNewGame(gameID) {
    return new Promise( (resolve, reject) => {
      console.log('live api, gameID:' + gameID);
      if (gameID && gameID.length > 1) {
        instance.get('startGame.php')
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
              const gameID2 = response.data;
              console.log('gameID2: ' + gameID2);
              //return response.data;
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject(error);
          });
      } else {
        reject('Error communicating with the server! Check error message.');
      }
    });
  }

  /**
   * Get all 5 for a voice question with query using IDs
   *
   * @param {string} ansIDs whovox game IDs for querying all 5 q's
   */
  static loadVoiceQuestion(ansIDs) {
    return new Promise( (resolve, reject) => {
      if (ansIDs) {
        instance.get('loadAnswers.php')
          .then( (response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject(error);
          });
      } else {
        reject('Error communicating with the server!!! Check error message.');
      }
    });
  }


}

export default LiveApi;
