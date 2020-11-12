import axios from 'axios';
import getStore from '../index';

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "https://whovox.com/php/",
});

class MockApi {

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

    //console.log('getNewGame id: ' + gameID.id);

    const gameID2 = gameID.toString();
    return new Promise( (resolve, reject) => {
      if (gameID2 && gameID2.length > 1) {
        instance.get('startGame.php?ctgyMovies=' + ctgyMovies + '&ctgyMusic=' + ctgyMusic + '&ctgyNews=' + ctgyNews + '&ctgySports=' + ctgySports)
          .then( (response) => {
            if (response.data) {
              const retObj = {newGameData: response.data} // put returned data into parent object
              //console.log(JSON.stringify(retObj));
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

  ///////////// PRELOAD VOICE & SFX CLIPS ////////////////

  static getGameClips(newGameData) {
/*
    // INDEXEDDB
    // Let us open our database
    const request = window.indexedDB.open("wvxDatabase", 3);

    // Generic error handler for all errors targeted at this database's requests.
    request.onerror = function(event) {
      console.error("Indexed DB error: " + event.target.errorCode);
    };

    // This event is only implemented in recent browsers
    request.onupgradeneeded = function(event) {
      // Save the IDBDatabase interface
      let wvxDB = event.target.result;
      // Create an objectStore for this database
      let objectStore = wvxDB.createObjectStore("name", { keyPath: "myKey" });
    };

    // success block
    request.onsuccess = function(event) {
      // Do something with request.result!
      //console.log('DB onsuccess error: ' + event);
      let wvxDB = event.target.result;
      console.log('DB created: ' + wvxDB);
    };
  */

    const gameClips = Object.values(newGameData);
    // convert object to array
    const allClips = gameClips[0];
    // each clip name in separate var
    const clip0 = allClips[0].CLIP_NAME;
    const clip1 = allClips[1].CLIP_NAME;
    const clip2 = allClips[2].CLIP_NAME;
    const clip3 = allClips[3].CLIP_NAME;
    const clip4 = allClips[4].CLIP_NAME;
    // put clips into array
    const clipArray = [clip0, clip1, clip2, clip3, clip4];
    let i;
    // loop through and create audio
    for (i = 0; i <= 4; i++) {

      const nmFrst = clipArray[i].substr(0,1) || '';
      let dir;

      if(nmFrst == 'A' || nmFrst == 'B') {dir = 'AB';}
      if(nmFrst == 'C' || nmFrst == 'D') {dir = 'CD';}
      if(nmFrst == 'E' || nmFrst == 'F') {dir = 'EF';}
      if(nmFrst == 'G' || nmFrst == 'H') {dir = 'GH';}
      if(nmFrst == 'I' || nmFrst == 'J') {dir = 'IJ';}
      if(nmFrst == 'K' || nmFrst == 'L') {dir = 'KL';}
      if(nmFrst == 'M' || nmFrst == 'N') {dir = 'MN';}
      if(nmFrst == 'O' || nmFrst == 'P') {dir = 'OP';}
      if(nmFrst == 'Q' || nmFrst == 'R') {dir = 'QR';}
      if(nmFrst == 'S' || nmFrst == 'T') {dir = 'ST';}
      if(nmFrst == 'U' || nmFrst == 'V') {dir = 'UV';}
      if(nmFrst == 'W' || nmFrst == 'X') {dir = 'WX';}
      if(nmFrst == 'Y' || nmFrst == 'Z') {dir = 'YZ';}

      this.audio = new Audio();
      let gameAudio;

      // can play ogg or mp3
				if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
          gameAudio = localStorage.setItem(clipArray[i], 'audio/' + dir + '/' + clipArray[i] + '.ogg');
          this.audio = new Audio(gameAudio);
					}
				else {
          gameAudio = localStorage.setItem(clipArray[i], 'audio/' + dir + '/' + clipArray[i] + '.mp3');
          this.audio = new Audio(gameAudio);
					}
    }

    // load sfx files
    const Answer_Right = 'Answer_Right';
    const Answer_Wrong = 'Answer_Wrong';
    const Game_Over = 'Game_Over';
    const Intro_Collage = 'Intro_Collage';
    const Cheer = 'Cheer';

    const sfxArray = [Answer_Right, Answer_Wrong, Game_Over, Intro_Collage, Cheer]
    let j;
    // loop through and create audio
    for (j = 0; j <= 4; j++) {
      this.audio = new Audio();
      let gameSfx;
      // can play ogg or mp3
      if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
        gameSfx = localStorage.setItem(sfxArray[j], 'audio/_sfx/' + sfxArray[j] + '.ogg');
        this.audio = new Audio(gameSfx);
        }
      else {
        this.audio = new Audio(gameSfx);
        }
    }

    return clipArray, sfxArray;

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
    //console.log('saveFinishedGame gameData:' + JSON.stringify(gameData));
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
