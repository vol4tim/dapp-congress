import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import hett from 'hett'
import AddProposal from './addProposal'
import Vote from './vote'
import Result from './result'
import Logs from '../components/logs'
import { loadBalance, loadProposals, loadLogs } from '../../../modules/congress/actions';
import { CONGRESS } from '../../../config/config';

class Container extends Component {
  componentWillMount() {
    this.props.loadProposals();
    this.props.loadBalance();
    this.props.loadLogs();
  }
  render() {
    return (
      <div>
        <h1>{CONGRESS}</h1>
        <p>Balance: <b>{this.props.balance} ETH ({this.props.balanceUsd} USD)</b></p>
        {this.props.proposals.length > 0 &&
          <div className="panel panel-default">
            <div className="panel-body">
              <p>Ожидают моего голоса</p>
              <div>
                {this.props.proposals.map((item, index) =>
                  (
                    <span key={index}>
                      <span className="label label-warning">id: <b>{item.id}</b></span>
                      &nbsp;
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        }
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
            {this.props.isLoadLogs ?
              <p>...</p>
              :
              <Logs items={this.props.logItems} />
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const coinbase = hett.web3h.coinbase()
  let proposals = []
  const now = (new Date().getTime()) / 1000
  _.forEach(state.congress.proposals, (item) => {
    if (item.executed === false && item.votingDeadline > now && _.has(item, 'voted') && !_.has(item.voted, coinbase)) {
      proposals.push(item)
    }
  })
  proposals = _.reverse(proposals)
  return {
    isLoadLogs: state.congress.loadLogs,
    logItems: state.congress.logs.slice(0, 10),
    balance: state.congress.balance,
    balanceUsd: state.congress.balanceUsd,
    proposals
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    loadBalance,
    loadProposals,
    loadLogs,
  }, dispatch)
  return {
    loadBalance: actions.loadBalance,
    loadProposals: actions.loadProposals,
    loadLogs: () => actions.loadLogs(props.params.address),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
