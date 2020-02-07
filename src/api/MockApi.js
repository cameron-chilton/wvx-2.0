import delay from "./delay";

class MockApi {

  /**
   * Initial data load for everything.
   *
   * @param {string} gameID whovox game ID
   */
  static getNewGame(gameID) {
    return new Promise( (resolve, reject) => {
      if (gameID && gameID.length > 1) {
        setTimeout( () => {
          resolve({ ...newGameData });
          //reject('MOCK TEST ERROR -- getNewGame');
        }, delay);
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
  static loadGameVoices(ansIDs) {
    return new Promise( (resolve, reject) => {
      if (ansIDs) {
        setTimeout( () => {
          resolve({ ...gameVoices });
          //reject('MOCK TEST ERROR -- loadGameVoices');
        }, delay);
      } else {
        reject('Error communicating with the server!!! Check error message.');
      }
    });
  }

}

/***********************************************************/
/*                     Mock Data                           */
/***********************************************************/

export const gameID = '123456578';

export const newGameData = {
  ansIDs: [101,102,103,104,105]
};

// new all_games table: (gameID, date, name, location, score)
export const gameVoices = {
  gameVoices: [{
    voxCount0: [{
      id: 101,
      firstname: 'KEVIN',
      lastname: 'SPACEY',
      clipname: 'Spacey_Kevin'
    },{
      id: 93,
      firstname: 'NICOLAS',
      lastname: 'CAGE',
      clipname: 'Cage_Nicolas'
    },{
      id: 7,
      firstname: 'STEPHEN',
      lastname: 'COLBERT',
      clipname: 'Colbert_Stephen'
    },{
      id: 2,
      firstname: 'DAVID',
      lastname: 'DUCHOVNY',
      clipname: 'Duchovny_David'
    },{
      id: 480,
      firstname: 'BILL',
      lastname: 'MAHER',
      clipname: 'Maher_Bill'
    }]
  }]

};

export const gameVoices2 = {
  voxCount0: {
    voiceChoices: [{
      id: 101,
      firstname: 'KEVIN',
      lastname: 'SPACEY',
      clipname: 'Spacey_Kevin'
    },{
      id: 93,
      firstname: 'NICOLAS',
      lastname: 'CAGE',
      clipname: 'Cage_Nicolas'
    },{
      id: 7,
      firstname: 'STEPHEN',
      lastname: 'COLBERT',
      clipname: 'Colbert_Stephen'
    },{
      id: 2,
      firstname: 'DAVID',
      lastname: 'DUCHOVNY',
      clipname: 'Duchovny_David'
    },{
      id: 480,
      firstname: 'BILL',
      lastname: 'MAHER',
      clipname: 'Maher_Bill'
    }]
  },
  voxCount1: {
    voiceChoices: [{
      id: 102,
      firstname: 'EDWARD',
      lastname: 'NORTON',
      clipname: 'Norton_Edward'
    },{
      id: 397,
      firstname: 'TY',
      lastname: 'BURRELL',
      clipname: 'Burrell_Ty'
    },{
      id: 436,
      firstname: 'COREY',
      lastname: 'HAIM',
      clipname: 'Colbert_Stephen'
    },{
      id: 494,
      firstname: 'RIVER',
      lastname: 'PHOENIX',
      clipname: 'Phoenix_River'
    },{
      id: 476,
      firstname: 'ED',
      lastname: 'HELMS',
      clipname: 'Helms_Ed'
    }]
  }
}

export default MockApi;
