import axios from "axios";

export const instance = axios.create({
  baseURL: window.apiUrl ? window.apiUrl : "http://localhost/WVX-2.0/src/php/",
});

class MockApi {

  /**
   * Initial data load for everything.
   *
   * @param {string} gameID whovox game ID
   */
  static getNewGame(gameID) {
    return new Promise( (resolve, reject) => {
      if (gameID && gameID.length > 1) {
        instance.get('startGame.php')
          .then( (response) => {
            if (response.data) {
              const retObj = {newGameData: response.data} // put returned data into parent object
              //console.log('getNewGame retObj: ' + JSON.stringify(retObj));
              resolve(retObj);
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
   * @param {string} newGameData whovox game IDs for querying all 5 q's
   */
  static loadVoiceQuestion(newGameData) {
    const gameAnswers = Object.values(newGameData);
    console.log('gameAnswers:' + JSON.stringify(gameAnswers));
    const questionArray = gameAnswers[0];
    const ansID = questionArray[0].ID;
    console.log('ansID:' + JSON.stringify(ansID));
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
        reject('Error communicating with the server!!! Check error message.');
      }
    });
  }

///////////// GET NEXT QUESTION AFTER 0 ////////////////

  static getNextQuestion(newGameData, ansCount) {
    const gameAnswers = Object.values(newGameData);
    console.log('getNextQuestion ansCount:' + ansCount);
    console.log('getNextQuestion gameAnswers:' + JSON.stringify(gameAnswers));
    const questionArray = gameAnswers[ansCount];
    console.log('getNextQuestion questionArray:' + JSON.stringify(questionArray));
    const ansID = questionArray.ID;
    console.log('getNextQuestion ansID:' + JSON.stringify(ansID));
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

  //static loadVoiceQuestion(newGameData) {
  //  return new Promise( (resolve, reject) => {
  //    if (newGameData) {
  //        resolve({ ...voiceQuestion });
  //        //reject('MOCK TEST ERROR -- loadVoiceQuestion');
  //    } else {
  //      reject('Error communicating with the server!!! Check error message.');
  //    }
  //  });
  //}


}

/***********************************************************/
/*                     Mock Data                           */
/***********************************************************/

//export const gameID = '12345678';

export const newGameDataOLD = {
  newGameData: {
    "0":
    {
      "ID": "642",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "RACE": "White",
      "TIMES_ASKED": "0",
      "TIMES_RIGHT": "0",
      "DOB": "1946-1964"
    },
    "1":
    {
      "ID": "1050",
      "CATEGORY": "News/Politics",
      "GENDER": "Female",
      "ACCENT": "US",
      "RACE": "Other",
      "TIMES_ASKED": "0",
      "TIMES_RIGHT": "0",
      "DOB": "1900-1945"
    },
    "2":
    {
      "ID": "386",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "RACE": "White",
      "TIMES_ASKED": "2",
      "TIMES_RIGHT": "1",
      "DOB": "1946-1964"
    },
    "3":
    {
      "ID": "615",
      "CATEGORY": "Movies/TV",
      "GENDER": "Female",
      "ACCENT": "US",
      "RACE": "White",
      "TIMES_ASKED": "4",
      "TIMES_RIGHT": "3",
      "DOB": "1965-1980"
    },
    "4":
    {
      "ID": "1027",
      "CATEGORY": "Music/Arts",
      "GENDER": "Male",
      "ACCENT": "US",
      "RACE": "White",
      "TIMES_ASKED": "5",
      "TIMES_RIGHT": "3",
      "DOB": "1900-1945"
    }
  }
};

export const voiceQuestion = {
  voiceQuestion: {
    "0":
    {
      "ID": "506",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "FIRSTNAME": "MICHAEL",
      "LASTNAME": "RICHARDS",
      "RACE": "White",
      "DOB": "1946-1964"
    },
    "1":
    {
      "ID": "723",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "FIRSTNAME": "ANDY",
      "LASTNAME": "KAUFMAN",
      "RACE": "Other",
      "DOB": "1946-1964"
    },
    "2":
    {
      "ID": "811",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "FIRSTNAME": "STEVE",
      "LASTNAME": "BUSCEMI",
      "RACE": "White",
      "DOB": "1946-1964"
    },
    "3":
    {
      "ID": "545",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "FIRSTNAME": "JOE",
      "LASTNAME": "PESCI",
      "RACE": "White",
      "DOB": "1946-1964"
    },
    "4":
    {
      "ID": "642",
      "CATEGORY": "Movies/TV",
      "GENDER": "Male",
      "ACCENT": "US",
      "FIRSTNAME": "PAULY",
      "LASTNAME": "SHORE",
      "RACE": "White",
      "DOB": "1946-1964"
    }
  }
};

export default MockApi;
