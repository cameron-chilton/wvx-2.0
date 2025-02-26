import React, {Component} from 'react';
import {string, number, oneOfType} from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import utils from '../utils/math-utils';
import whovoxUtils from '../utils/whovox-utils';
import * as actions from '../actions/whovoxActions';

class HallOfFame extends Component {

  constructor() {
    super();
    this.state = {
      tableData: {}
    };
    this.myRef = React.createRef() || '';
    this.audio = new Audio();
    let gameSfx;
    // can play ogg or mp3
    if (this.audio.canPlayType('audio/ogg; codecs="vorbis"')) {
      gameSfx = localStorage.getItem('Cheer', 'https://whovox.com/audio/_sfx/Cheer.ogg');
      this.audio = new Audio(gameSfx);
      }
    else {
      gameSfx = localStorage.getItem('Cheer', 'https://whovox.com/audio/_sfx/Cheer.mp3');
      this.audio = new Audio(gameSfx);
      }
    this.audio.play();
    setTimeout( () => {
      this.audio2 = new Audio();
      let gameSfx2;
      // can play ogg or mp3
      if (this.audio2.canPlayType('audio/ogg; codecs="vorbis"')) {
        gameSfx2 = localStorage.getItem('Answer_Right', 'https://whovox.com/audio/_sfx/Answer_Right.ogg');
        this.audio2 = new Audio(gameSfx2);
        }
      else {
        gameSfx2 = localStorage.getItem('Answer_Right', 'https://whovox.com/audio/_sfx/Answer_Right.mp3');
        this.audio2 = new Audio(gameSfx2);
        }
      this.audio2.play();
  }, 2000);
  }

  componentDidMount() {
    setTimeout( () => {
      fetch('https://whovox.com/php/getHallOfFameData.php')
        .then(response => response.json())
        .then(data => this.setState({tableData: data}));
    }, 1500);
    setTimeout( () => {
        this.handleScrollToElement();
    }, 3200);
  }

  handleScrollToElement() {
      window.scrollTo(0, this.myRef.current.scrollIntoView());
  }

  render() {

    const gameID = this.props || null;
    const tdata = this.state.tableData || {};
    const lastOne = Object.keys(tdata).length - 1 || null;

    return (
      <div>
        <div className="hallOfFame">
          <div className="hofHead"><h3>HALL OF FAME</h3></div>
          <div className="gameCt">{parseFloat(lastOne.toLocaleString()) + 1 || '--'} Games</div>
        </div>
        <div>
          <div className="scrollbox">
          <table className="HOF-table">
            <thead>
              <tr role="row">
                <th scope="col" role="columnheader" className="hd1">RANK</th>
                <th scope="col" role="columnheader" className="hd2">SCORE</th>
                <th scope="col" role="columnheader" className="hd3">NAME</th>
                <th scope="col" role="columnheader" className="hd4">LOCATION</th>
                <th scope="col" role="columnheader" className="hd5">DATE</th>
              </tr>
            </thead>
              <tbody>
              {
              (tdata !== null) &&
                utils.range(0,lastOne).map(number => (
                  <tr key={number} ref={(gameID.id == tdata[number].id) ? this.myRef : ''}>
                    <td className="col1"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{number + 1}</span></td>
                    <td className="col2"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{parseFloat(tdata[number].score).toLocaleString('en')}</span></td>
                    <td className="col3"><span className={(gameID.id == tdata[number].id) ? 'HOF-nameloc' : 'HOF-regname'} title={tdata[number].name}>{tdata[number].name}</span></td>
                    <td className="col4"><span className={(gameID.id == tdata[number].id) ? 'HOF-nameloc' : 'HOF-regname'} title={tdata[number].location}>{tdata[number].location}</span></td>
                    <td className="col5"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{whovoxUtils.mysqlDate(tdata[number].date)}</span></td>
                  </tr>
                )
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

  }

}

HallOfFame.propTypes = {
  id: oneOfType([string, number]),
};

function mapStateToProps(state) {
  return {
    id: state.whovoxGame.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HallOfFame);
