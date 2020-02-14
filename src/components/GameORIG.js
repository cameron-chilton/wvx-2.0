//import React, {useState, useEffect} from 'react';
//import PropTypes from 'prop-types';
//import VoiceChoices from './VoiceChoices';
//import PlayButton from './PlayButton';
//import GameInfo from './GameInfo';
//import { GET_NEWGAME, GET_ANSWERS } from '../constants/DataURLs';
//import axios from 'axios';
//import utils from '../utils/math-utils';

// GAME STATUS: loading, start, timeon, answered, noanswer, gameover,
//let gameStatus = 'start';

// GAME VARS: voxCount, score, right, wrong, etc.
//let voxGameCount = 0, gameScore = 0, ansRight = 0, ansWrong = 0;

// BUTTON TEXT: secsLeft, Nextvox, Right!, Wrong!, Out of Time!
//let btnTxt;

// REQUEST VAR
//let response;

// GAME VARS
//let voxAnswers, ansIDs, ansCats, ansGndr, ansAcnt, ansRace, ansDob;

////////////////// START NEW GAME //////////////////
{/*
  const getNextGame = async () => {
  return response = await axios.get(GET_NEWGAME).then(response => {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })
}
const getNextGameData = () => {
  gameScore = 0; // reset game score
  getNextGame().then(data => {
    voxAnswers = Object.keys(data).map(key =>
      <option key={key} value={key}>{data[key]}</option>
    )
    ansIDs = voxAnswers.map(voxAnswers => voxAnswers.props.children.ID);
    ansCats = voxAnswers.map(voxAnswers => voxAnswers.props.children.CATEGORY);
    ansGndr = voxAnswers.map(voxAnswers => voxAnswers.props.children.GENDER);
    ansAcnt = voxAnswers.map(voxAnswers => voxAnswers.props.children.ACCENT);
    ansRace = voxAnswers.map(voxAnswers => voxAnswers.props.children.RACE);
    ansDob = voxAnswers.map(voxAnswers => voxAnswers.props.children.DOB);
    getVoxData();
    console.log('Game Answer IDs: ' + ansIDs);
  })
}


////////////////// GET VOX CHOICES //////////////////

let voxChoices, voxIDs, categories, firstnames, lastnames, answerCat;

const getVoxChoices = async () => {
  return response = await axios.get(
        GET_ANSWERS +
        '?ansID=' + ansIDs[voxGameCount] +
        '&ansCat=' + ansCats[voxGameCount] +
        '&ansGndr=' + ansGndr[voxGameCount] +
        '&ansAcnt=' + ansAcnt[voxGameCount] +
        '&ansRace=' + ansRace[voxGameCount] +
        '&ansDob=' + ansDob[voxGameCount]
      ).then(response => {
    if (response.data != undefined) {
      return response.data
    }
    else {
      console.log('getVoxChoices returned undefined')
    }

  })
  .catch(function (error) {
    console.log(error);
  })
}
const getVoxData = () => {
  getVoxChoices().then(data => {
    voxChoices = Object.keys(data).map(key =>
      <option key={key} value={key}>{data[key]}</option>
    )
    voxIDs = voxChoices.map(voxChoices => voxChoices.props.children.ID);
    firstnames = voxChoices.map(voxChoices => voxChoices.props.children.FIRSTNAME);
    lastnames = voxChoices.map(voxChoices => voxChoices.props.children.LASTNAME);
    categories = voxChoices.map(voxChoices => voxChoices.props.children.CATEGORY);
    console.log('voxIDs: ' + voxIDs);
    console.log('Answer ' + (voxGameCount + 1) + ' ID: ' + ansIDs[voxGameCount]);
    console.log('getVoxData isBtnClicked: ' + isBtnClicked);
    answerCat = ansCats[voxGameCount];
  })
}




let isBtnClicked = false;

////////////////// GAME STATE //////////////////

const useGameState = () => {

  const [secondsLeft, setSecondsLeft] = useState(1010);

  /////////////////// TIMER ///////////////////

  useEffect(() => {
    if (gameStatus === 'start' && secondsLeft === 1010) {
      getNextGameData();
      gameStatus = 'timeon';
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 10), 100);
      return () => clearTimeout(timerId);
    }
    else if (secondsLeft > 0 && gameStatus === 'timeon') {
      btnTxt = (secondsLeft / 100).toFixed(1);
      const timerId = setTimeout(() => setSecondsLeft(secondsLeft - 10), 100);
      return () => clearTimeout(timerId);
    }
    else if (secondsLeft === 0) {
      gameStatus = 'noanswer';
      setGameState();
      const timerId = setTimeout( () => setSecondsLeft() );
      return () => clearTimeout(timerId);
    }

  });

  /////////////////// SET STATE ///////////////////

  const setGameState = () => {

    if (gameStatus === 'timeon') {
      gameStatus = 'answered';
      voxGameCount++; // incr game ct var
      this.isBtnClicked = true;
      // change btnText to 'Nextvox' after 1.5 sec
      //setTimeout( () => nextVox(), 1500 );
      //btnTxt = setTimeout( () => nextVox(), 1500 );
    }
    else if (gameStatus === 'noanswer') {
      btnTxt = 'Out of Time!';
      voxGameCount++; // incr game ct var
      gameScore = gameScore - 250; // game score wrong w/no answer
    }
    else if (gameStatus === 'gameover') {
      btnTxt = 'Game Over';
    }
    console.log('setGameState exit: ' + gameStatus);
    console.log('setGameState voxGameCount: ' + voxGameCount);
    console.log('setGameState isBtnClicked: ' + isBtnClicked);
    return gameStatus;
  };

  return {secondsLeft, setGameState, isBtnClicked};

};

///////////////////////////////////////////////////////
/////////////////// GAME COMPONENT ////////////////////
///////////////////////////////////////////////////////

const Game = props => {

  const {
    secondsLeft,
    setGameState,
    isBtnClicked
  } = useGameState();

  const onStartbtnClick = () => {

    {console.log('onStartbtnClick gameStatus: ' + gameStatus);}

    if (gameStatus === 'answered') {
      gameStatus = 'timeon';
      props.addVoxCt();
      getVoxData();
      }
    else if (gameStatus === 'noanswer') {
      gameStatus = 'timeon';
      props.addVoxCt();
      getVoxData();
      }
    else if (gameStatus === 'gameover') {
      // gameStatus = 'timeon';
      }
  };

  ////////////// CLICK AN ANSWER ////////////////

  const onVoxClick = (id) => {

    console.log('CLICK, onVoxClick ID: ' + id);

    if (gameStatus === 'timeon') {
      let result = (id === ansIDs[(voxGameCount)]); // get t/f of answer
      if (result && voxGameCount < 4) { // if right
        btnTxt = 'RIGHT!';
        gameScore = gameScore + secondsLeft;
        ansRight++;
      }
      else if (!result && voxGameCount < 4) { // if wrong
        btnTxt = 'WRONG!';
        gameScore = gameScore - 250;
        ansWrong++;
      }
      else if (result && voxGameCount === 4) { // last answer right
        btnTxt = 'RIGHT!';
        gameStatus = 'gameover';
        gameScore = gameScore + secondsLeft;
        ansRight++;
      }
      else if (!result && voxGameCount === 4) { // last answer wrong
        btnTxt = 'GAME OVER';
        gameStatus = 'gameover';
        gameScore = gameScore - 250;
        ansWrong++;
      }
      else if (voxGameCount > 4) {
        return
      }
      setGameState();

    }
    else if (gameStatus === 'answered' || gameStatus === 'noanswer' || gameStatus === 'gameover') { return }
    else { return }

  };



    ///////////////// RETURN COMPONENT ////////////////

    return (

      <div className="game">

        <div className="startBtn">
          <GameInfo voxCt={props.voxCt} category={answerCat} score={gameScore} right={ansRight} wrong={ansWrong} />
          <PlayButton onClick={onStartbtnClick} gameStatus={gameStatus} secsLeft={secondsLeft} buttonText={btnTxt} />
        </div>

        <div className="btn-holder">
          {
            utils.range(0, 4).map(number => (
              <VoiceChoices
                key={number}
                id={voxIDs && voxIDs[number]}
                category={categories && categories[number]}
                number={number}
                onClick={onVoxClick.bind(this)}
                isBtnClicked={isBtnClicked}
                firstname={firstnames && firstnames[number]}
                lastname={lastnames && lastnames[number]}
                name={firstnames && firstnames[number] + ' ' + lastnames && lastnames[number]}
              />
              ))
          }
        </div>

      </div>

    );

};

  Game.propTypes = {
    voxCt: PropTypes.number,
    score: PropTypes.number,
    id: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    number: PropTypes.number,
    btnTxt: PropTypes.string,
    isBtnClicked: PropTypes.bool
  };

export default Game;

*/}
