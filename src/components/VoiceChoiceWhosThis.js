import React from 'react';
import {string} from 'prop-types';
import whovoxUtils from '../utils/whovox-utils';

const VoiceChoiceContent = ({firstname, lastname}) => {

  const wikiURL = 'https://en.wikipedia.org/wiki/' + whovoxUtils.toTitleCase(firstname) + '_' + whovoxUtils.toTitleCase(lastname);

  return (
    <>
      <span className="ansWhosThis"><a href={`${wikiURL}`} target="_blank" rel="noopener noreferrer">WHO&#39;S THIS?</a></span>
    </>
  );
};

VoiceChoiceContent.propTypes = {
  firstname: string,
  lastname: string,
};

export default VoiceChoiceContent;
