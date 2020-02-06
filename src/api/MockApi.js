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

}

/***********************************************************/
/*                     Mock Data                           */
/***********************************************************/

export const gameID = '123456578';

export const newGameData = {
  // new all_games table (gameID, date, name, location, score)
  ansIDs: [101,102,103,104,105],
};

export default MockApi;
