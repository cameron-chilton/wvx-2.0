import React, {Component} from 'react';
import {string, number, oneOfType} from "prop-types";
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
    this.myRef = React.createRef();
  }

  handleScrollToElement() {
      window.scrollTo(0, this.myRef.current.scrollIntoView());
  }

  componentDidMount() {
    setTimeout( () => {
      fetch('http://localhost/WVX-2.0/src/php/getHallOfFameData.php')
        .then(response => response.json())
        .then(data => this.setState({tableData: data}));
    }, 700);
    setTimeout( () => {
        this.handleScrollToElement();
    }, 800);
  }

  componentDidUpdate() {
  }



  render() {

    const gameID = this.props;
    const tdata = this.state.tableData || {};
    const lastOne = Object.keys(tdata).length - 1 || null;

    return (
      <div>
        <h3>HALL OF FAME</h3>
        <h4>{parseFloat(lastOne) + 1 || '--'} Games Played</h4>
          <table className="HOF-table">
            <thead>
              <tr role="row">
                <th scope="col" role="columnheader" className="hd1">Rank</th>
                <th scope="col" role="columnheader" className="hd2">Score</th>
                <th scope="col" role="columnheader" className="hd3">Name</th>
                <th scope="col" role="columnheader" className="hd4">Location</th>
                <th scope="col" role="columnheader" className="hd5">Date</th>
              </tr>
            </thead>
          </table>
          <div className="scrollbox">
            <table className="HOF-table">
              <tbody>
              {
              (tdata !== null) &&
                utils.range(0,lastOne).map(number => (
                  <tr key={number} ref={(gameID.id == tdata[number].id) ? this.myRef : ''}>
                    <td className="col1"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{number + 1}</span></td>
                    <td className="col2"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{parseFloat(tdata[number].score).toLocaleString('en')}</span></td>
                    <td className="col3"><span className={(gameID.id == tdata[number].id) ? 'HOF-nameloc' : 'HOF-regname'}>{tdata[number].name}</span></td>
                    <td className="col4"><span className={(gameID.id == tdata[number].id) ? 'HOF-nameloc' : 'HOF-regname'}>{tdata[number].location}</span></td>
                    <td className="col5"><span className={(gameID.id == tdata[number].id) ? 'HOF-highlight' : ''}>{whovoxUtils.mysqlDate(tdata[number].date)}</span></td>
                  </tr>
                )
              )}
              </tbody>
            </table>
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
