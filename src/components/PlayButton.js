import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = props => (

	<div className=''>
      <button className='play-button' onClick={props.onStartClick}>
        {props.btnTxt}
      </button>
	</div>
);

PlayButton.propTypes = {
  btnTxt: PropTypes.string,
  onStartClick: PropTypes.func,
  };

export default PlayButton;
