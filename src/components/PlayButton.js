import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = props => (

	<div className=''>
        <button className='play-button' onClick={props.onStartClick}>
          {props.buttonText}
        </button>
	</div>
);

PlayButton.propTypes = {
  buttonText: PropTypes.string,
  onStartClick: PropTypes.func,
  };

export default PlayButton;
