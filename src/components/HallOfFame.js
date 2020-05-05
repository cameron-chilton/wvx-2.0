import React, {Component} from 'react';
import {object} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import utils from '../utils/math-utils';
import whovoxUtils from '../utils/whovox-utils';
import * as actions from '../actions/whovoxActions';

// React Component to display the timer
class HallOfFame extends Component {

  constructor() {
    super();
    this.state = {
      tableData: {}
    };
  }

  componentDidMount() {
    setTimeout( () => {
      fetch('http://localhost/WVX-2.0/src/php/getHallOfFameData.php')
        .then(response => response.json())
        .then(data => this.setState({tableData: data}));
    }, 700);
  }

  componentDidUpdate() {
  }

  render() {
    const tdata = this.state.tableData || {};
    const lastOne = Object.keys(tdata).length - 1 || null;
    return (
      <div>
        <h3>HALL OF FAME</h3>
        <table className="">
          <thead>
            <tr role="row">
              <th scope="col" role="columnheader">Rank</th>
              <th scope="col" role="columnheader">Score</th>
              <th scope="col" role="columnheader">Name</th>
              <th scope="col" role="columnheader">Location</th>
              <th scope="col" role="columnheader">Date</th>
            </tr>
          </thead>
          <tbody>
          {
          (tdata !== null) &&
            utils.range(0,lastOne).map(number => (
              <tr key={number}>
                <td>{number + 1}</td>
                <td>{parseFloat(tdata[number].score).toLocaleString('en')}</td>
                <td>{tdata[number].name}</td>
                <td>{tdata[number].location}</td>
                <td>{tdata[number].date}</td>
              </tr>
            )
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

HallOfFame.propTypes = {
  actions: object.isRequired,
};

function mapStateToProps(state) {
  return {
    gameOver: state.whovoxGame.gameOver,
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
