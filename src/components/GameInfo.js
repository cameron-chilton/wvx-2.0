import React from 'react';
import PropTypes from 'prop-types';

const GameInfo = props => (

	<div className='game-info'>
    <div>
      <span>Vox {props.voxCount} of 5</span>
      <span>Score: {props.score.toLocaleString() || 0}</span>
      <span>Category: {props.category}</span>
    </div>
    <div>
      <span>Right: {props.right}</span>
      <span>Wrong: {props.wrong}</span>
    </div>
	</div>
);

GameInfo.propTypes = {
  score: PropTypes.number,
  voxCount: PropTypes.number
  };

export default GameInfo;
