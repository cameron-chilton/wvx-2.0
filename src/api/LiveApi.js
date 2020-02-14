import axios from "axios";
//import { GET_NEWGAME, GET_ANSWERS } from '../constants/DataURLs';
// import queryString from "qs";
//import * as errors from "../constants/ErrorTypes";

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "http://localhost/WVXtest/src/data/",
});

class LiveApi {

  /**
   * Starts the initial data load for the UI.
   *
   * @param {string} gameID whovox game ID
   */
  static startDataLoad() {
    return new Promise( (resolve, reject) => {

        instance.get('startGame2.php')
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

    });
  }








  /**
   * Gets all previously saved DST-specific fields in order to restore
   * the form to it's previous state.
   *
   * @param {string} id DST ID to look for to reload from DB
   */
  static restoreDecision(id) {
    return new Promise( (resolve, reject) => {
      if (id) {
        instance.get(`loadDst/${id}`)
          .then( response => {
            if (response.data) {
              resolve(response.data);
            }
          })
          .catch( error => {
            reject(error);
          });
      }
    });
  }

  /**
   * Send out the completed form to CTB/DST database
   */
  static saveDecision(bundle) {
    return new Promise( (resolve, reject) => {
      if (bundle) {
        instance.post("/saveDst", bundle)
          .then( response => {
            if (response.status === 200) {
              resolve();
            } else {
              reject("Non-Success response from API. Considering as ERROR!");
            }
          })
          .catch( error => {
            reject(error);
          });
      } else {
        const rejectObj = {
          bundle,
          errorMsg: "Invalid/Null save bundle recieved! Check save data.",
        };
        reject(rejectObj);
      }
    });
  }
}

export default LiveApi;
