import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Page from './page'
import Account from '../../addressBook/containers/account'
import { timeConverter } from '../../../utils/helper'

const View = props => (
  <Page title={'Proposal #' + props.proposal.id}>
    <ul className="list-group">
      <li className="list-group-item">executed: <b>{(props.proposal.executed) ? 'true' : 'false'}</b></li>
      <li className="list-group-item">proposalPassed: <b>{(props.proposal.proposalPassed) ? 'true' : 'false'}</b></li>
      <li className="list-group-item">recipient: <Account address={props.proposal.recipient} /></li>
      <li className="list-group-item">amount: <b>{props.proposal.amount} ETH</b></li>
      <li className="list-group-item">description: <b>{props.proposal.description}</b></li>
      <li className="list-group-item">votingDeadline: <b>{timeConverter(props.proposal.votingDeadline)}</b></li>
      <li className="list-group-item">proposalHash: <b>{props.proposal.proposalHash}</b></li>
    </ul>
    <h3>Votes</h3>
    <p className="text-success">Ok: <b>{props.ok}</b></p>
    <p className="text-danger">No: <b>{props.no}</b></p>
  </Page>
)

function mapStateToProps(state, props) {
  let proposal = {}
  let ok = 0
  let no = 0
  if (_.has(state.congress.proposals, props.params.id)) {
    proposal = state.congress.proposals[props.params.id]
    if (proposal.currentResult < 0) {
      ok = proposal.currentResult + proposal.numberOfVotes
      no = proposal.numberOfVotes - ok
      if (ok > no) {
        const t = no
        no = ok
        ok = t
      }
    } else if (proposal.currentResult > 0) {
      ok = proposal.numberOfVotes - proposal.currentResult
      no = proposal.numberOfVotes - ok
      if (ok < no) {
        const t = no
        no = ok
        ok = t
      }
    } else {
      ok = proposal.numberOfVotes / 2
      no = proposal.numberOfVotes - ok
    }
  }
  return {
    proposal,
    ok,
    no
  }
}

export default connect(mapStateToProps)(View)
