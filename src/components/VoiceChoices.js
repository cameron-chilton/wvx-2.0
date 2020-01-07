import React from 'react';
import PropTypes from 'prop-types';

const VoiceChoices = props => (

    <button
      className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
      id={props.id}
      category={props.category}
      onClick={ () => props.onClick(props.id) }
      number={props.number}
      name={props.firstname + ' ' + props.lastname}
    >
      {props.firstname + ' ' + props.lastname}
    </button>

  );

  VoiceChoices.propTypes = {
    id: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    number: PropTypes.number,
    isBtnClicked: PropTypes.bool,
  };

export default VoiceChoices;
