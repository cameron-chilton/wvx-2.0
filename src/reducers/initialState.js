export default {
  fuelSavings: {
    newMpg: '',
    tradeMpg: '',
    newPpg: '',
    tradePpg: '',
    milesDriven: '',
    milesDrivenTimeframe: 'week',
    displayResults: false,
    dateModified: null,
    necessaryDataIsProvidedToCalculateSavings: false,
    savings: {
      monthly: 0,
      annual: 0,
      threeYear: 0
    }
  },
  whovoxGame: {
    id: '', // new all_games table (gameID, date, name, location, score)
    loading: false,
    score: 0,
    voxCount: 0,
    ansCount: 0,
    btnTxt: 'START GAME',
    timerOn: false,
    answered: false,
    outOfTime: false,
    gameOver: false,
    timer: 10000,
    ansRight: 0,
    ansWrong: 0,
    newGameData: [],
    nextQuestion: [],
    voiceQuestion: [],
    categories: ['Movies/TV','Music/Arts','News/Politics','Sports'],
    movTvChecked: true,
    musArtsChecked: true,
    newsPolChecked: true,
    sportsChecked: true,
  }
};
