import React from "react";
import { string,  bool, number, func } from "prop-types";

const VoiceChoices = props => (

    <button
      className='vxBtn'
      //className={!props.isBtnClicked ? 'vxBtn' : 'vxBtnSel'}
      //id={props.id}
      //category={props.category}
      onClick={ () => props.clickAnswer }
      //number={props.number}
      //name={props.firstname + ' ' + props.lastname}
    >
      {/*
      props.firstname + ' ' + props.lastname
      */}
    </button>

  );

  VoiceChoices.propTypes = {
    id: string,
    category: string,
    status: string,
    firstname: string,
    lastname: string,
    number: number,
    isBtnClicked: bool,
    clickAnswer: func,
  };

export default VoiceChoices;
