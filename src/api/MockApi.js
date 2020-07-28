import axios from 'axios';
import getStore from '../index';

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "http://localhost/WVX-2.0/src/php/",
});

class MockApi {

  ///////////// LOAD 5 ANSWERS FOR FIRST SESSION GAME ////////////////

  static getNewGame(gameID) {

    const store = getStore();
    const storeVals = store.getState();

    const mtvTF = storeVals.whovoxGame.movTvChecked;
    const maTF = storeVals.whovoxGame.musArtsChecked;
    const npTF = storeVals.whovoxGame.newsPolChecked;
    const spTF = storeVals.whovoxGame.sportsChecked;

    const ctgyMovies = mtvTF ? 'Movies/TV' : '';
    const ctgyMusic = maTF ? 'Music/Arts' : '';
    const ctgyNews = npTF ? 'News/Politics' : '';
    const ctgySports = spTF ? 'Sports' : '';

    console.log('getNewGame id: ' + gameID.id);

    const gameID2 = gameID.toString();
    return new Promise( (resolve, reject) => {
      if (gameID2 && gameID2.length > 1) {
        instance.get('startGame.php?ctgyMovies=' + ctgyMovies + '&ctgyMusic=' + ctgyMusic + '&ctgyNews=' + ctgyNews + '&ctgySports=' + ctgySports)
          .then( (response) => {
            if (response.data) {
              const retObj = {newGameData: response.data} // put returned data into parent object
              console.log(JSON.stringify(retObj));
              resolve(retObj);
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject(error);
          });
      } else {
        reject('Error in getNewGame. Check error message.');
      }
    });
  }

  ///////////// GET FIRST VOICE QUESTION ////////////////

  static loadVoiceQuestion(newGameData) {
    const gameAnswers = Object.values(newGameData);
    //console.log('loadVoiceQuestion gameAnswers:' + JSON.stringify(gameAnswers));
    const questionArray = gameAnswers[0];
    const ansID = questionArray[0].ID;
    const frstNm = questionArray[0].FIRSTNAME;
    const lastNm = questionArray[0].LASTNAME;
    const ctgy = questionArray[0].CATEGORY;
    const gndr = questionArray[0].GENDER;
    const acnt = questionArray[0].ACCENT;
    const race = questionArray[0].RACE;
    const dob = questionArray[0].DOB;
    return new Promise( (resolve, reject) => {
      if (newGameData) {
        instance.get('getVoiceQuestion.php?ansID=' + ansID + '&frstNm=' + frstNm + '&lastNm=' + lastNm + '&ctgy=' + ctgy
         + '&gndr=' + gndr + '&acnt=' + acnt + '&race=' + race + '&dob=' + dob)
        .then( (response) => {
          if (response.data) {
            const retObj = {voiceQuestion: response.data}
            resolve(retObj);
            //console.log('loadVoiceQuestion retObj: ' + JSON.stringify(retObj));
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

  //////////////////// GET ID FOR EACH GAME //////////////////////

  static getNextGameID() {
    return new Promise( (resolve, reject) => {

        instance.get('getNextGameID.php')
          .then( (response) => {
            if (response.data) {
              const retID = {id: response.data}; // return ID as object
              resolve(retID);
            } else {
              reject();
            }
          })
          .catch( (error) => {
            reject('Error in getNextGameID. Check error message: ' + error);
          });

    });
  }

  ///////////// LOAD 5 ANSWERS FOR GAMES AFTER FIRST ////////////////

  static getNextGame(gameID) {
    return new Promise( (resolve, reject) => {
      if (gameID && gameID.length > 1) {
        instance.get('startGame.php')
          .then( (response) => {
            if (response.data) {
              const retObj = {newGameData: response.data} // put returned data into parent object
              resolve(retObj);
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


///////////// GET NEXT QUESTION AFTER 0 ////////////////

  static getNextQuestion(newGameData, ansCount) {
    const gameAnswers = Object.values(newGameData);
    //console.log('getNextQuestion gameAnswers:' + JSON.stringify(gameAnswers));
    const questionArray = gameAnswers[ansCount];
    const ansID = questionArray.ID;
    const frstNm = questionArray.FIRSTNAME;
    const lastNm = questionArray.LASTNAME;
    const ctgy = questionArray.CATEGORY;
    const gndr = questionArray.GENDER;
    const acnt = questionArray.ACCENT;
    const race = questionArray.RACE;
    const dob = questionArray.DOB;
    return new Promise( (resolve, reject) => {
      if (newGameData) {
        instance.get('getVoiceQuestion.php?ansID=' + ansID + '&frstNm=' + frstNm + '&lastNm=' + lastNm + '&ctgy=' + ctgy
         + '&gndr=' + gndr + '&acnt=' + acnt + '&race=' + race + '&dob=' + dob)
        .then( (response) => {
          if (response.data) {
            const retObj = {nextQuestion: response.data}
            resolve(retObj);
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

  //////////////////// SAVE GAME DATA ///////////////////////

  static saveFinishedGame(gameData) {
    console.log('saveFinishedGame gameData:' + JSON.stringify(gameData));
    const id = gameData.id;
    const score = gameData.score;
    const name = gameData.name;
    const location = gameData.location;

    return new Promise( (resolve, reject) => {
      if (gameData) {
        instance.get('saveFinishedGame.php?id=' + id + '&score=' + score + '&name=' + name + '&location=' + location)
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

export default MockApi;
