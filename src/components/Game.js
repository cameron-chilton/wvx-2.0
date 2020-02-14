//import React, {useState, useEffect} from 'react';
import React from 'react';
//import PropTypes from 'prop-types';
import {func} from 'prop-types';
//import VoiceChoices from './VoiceChoices';
//import PlayButton from './PlayButton';
//import GameInfo from './GameInfo';
//import { GET_NEWGAME, GET_ANSWERS } from '../constants/DataURLs';
//import axios from 'axios';
//import utils from '../utils/math-utils';
import {whovoxGame} from '../types';

const Game = () => (
  <>
      <div className="game">
        {/*
        <div className="startBtn">
          <GameInfo voxCount={whovoxGame.voxCount} />
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
        */}
      </div>
    </>
);

  Game.propTypes = {
    whovoxGame: whovoxGame.isRequired,
    onStartClick: func,
  };

export default Game;
