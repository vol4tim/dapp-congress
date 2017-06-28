import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddProposal from './addProposal'
import Vote from './vote'
import Result from './result'
import Logs from '../components/logs'
import { loadBalance, logs } from '../../../modules/congress/actions';
import { CONGRESS } from '../../../config/config';

// <p>Ожидают моего голоса</p>
// <div>
//   <span className="label label-warning">id: <b>1</b></span>&nbsp;
//   <span className="label label-warning">id: <b>3</b></span>
// </div>
class Container extends Component {
  componentWillMount() {
    this.props.loadBalance();
    this.props.logs();
  }
  render() {
    return (
      <div>
        <h1>{CONGRESS}</h1>
        <p>Balance: <b>{this.props.balance} ETH</b></p>
        <div className="row">
          <div className="col-md-6">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#1" data-toggle="tab">Vote</a></li>
              <li><a href="#2" data-toggle="tab">Add</a></li>
              <li><a href="#3" data-toggle="tab">Result</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="1">
                <Vote />
              </div>
              <div className="tab-pane" id="2">
                <AddProposal />
              </div>
              <div className="tab-pane" id="3">
                <Result />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h2>Logs</h2>
            <Logs items={this.props.logItems} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    logItems: state.congress.logs.slice(0, 10),
    balance: state.congress.balance
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    loadBalance,
    logs,
  }, dispatch)
  return {
    loadBalance: actions.loadBalance,
    logs: () => actions.logs(props.params.address),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
