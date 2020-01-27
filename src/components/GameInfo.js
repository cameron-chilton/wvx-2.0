import React from 'react';
import { string, number, oneOfType } from "prop-types";

const GameInfo = ({voxCount}) => {
  return (
    <div className='game-info'>
    <div>
      <span>Vox {voxCount} of 5</span>
      {/*
      <span>Score: {props.score.toLocaleString() || 0}</span>
      <span>Category: {props.category}</span>

    </div>
    <div>
      {/*
      <span>Right: {props.right}</span>
      <span>Wrong: {props.wrong}</span>
      */}
    </div>
	</div>
  );
};

GameInfo.propTypes = {
  voxCount: oneOfType([string,number])
};

export default GameInfo;
