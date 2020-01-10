import React, {useState} from 'react';
import Game from './Game';

const WhovoxGame = () => {

  const [voxCount, setvoxCount] = useState(1);
  console.log(' ');
  // console.log('App.js voxCount: ' + voxCount);
	return <Game key={voxCount} addVoxCt={() => setvoxCount(voxCount + 1)} voxCt={voxCount} />;
}

export default function App () {
  return (
    <WhovoxGame />
  );
}
