import axios from "axios";
//import api from "../api";
//import * as action from "./constants/ActionTypes";

export const getWhatsNewContent = () => {
  return (dispatch) => {
    return axios.get("./whats-new.json")
      .then( (response) => {
        if (response.data) {
          const {
            releases,
          } = response.data;

          dispatch({ type: action.UPDATE_WHATS_NEW_DATE, whatsNewDate: releases[0].releaseDate });
          dispatch({ type: action.UPDATE_RELEASES, releases });
        }
      });
  };
};

////////////////// START NEW GAME //////////////////

export const getNextGame = async () => {
  return response = await axios.get(GET_NEWGAME).then(response => {
    return response.data
  })
  .catch(function (error) {
    console.log(error);
  })
}
export const getNextGameData = () => {
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

export const getVoxChoices = async () => {
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
