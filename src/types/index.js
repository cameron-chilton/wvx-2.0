// Centralized propType definitions
import { shape, number, bool, string, oneOfType } from 'prop-types';

export const whovoxGame = shape({
  gameID: oneOfType([number,string]),
  score: oneOfType([number,string]),
  voxCount: oneOfType([number,string]),
  btnTxt: oneOfType([number,string]),
  timerOn: bool,
  timer: number,
  movTvChecked: bool,
});

