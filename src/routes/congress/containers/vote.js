import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import hett from 'hett'
import Page from './page'
import Form from '../components/vote';
import Account from '../../addressBook/containers/account'
import { send } from '../../../modules/congress/actions';
import { timeConverter } from '../../../utils/helper'

const Vote = props => (
  <Page title={'Vote proposal #' + props.proposal.id}>
    <ul className="list-group">
      <li className="list-group-item">recipient: <Account address={props.proposal.recipient} /></li>
      <li className="list-group-item">amount: <b>{props.proposal.amount} ETH</b></li>
      <li className="list-group-item">description: <b>{props.proposal.description}</b></li>
      <li className="list-group-item">votingDeadline: <b>{timeConverter(props.proposal.votingDeadline)}</b></li>
      <li className="list-group-item">proposalHash: <b>{props.proposal.proposalHash}</b></li>
    </ul>
    <h3>Votes</h3>
    <p className="text-success">Ok: <b>{props.ok}</b></p>
    <p className="text-danger">No: <b>{props.no}</b></p>
    <hr />
    {props.myVote === false ?
      <Form onSubmit={props.onSubmit} />
      :
      <p>Ваш голос уже принят</p>
    }
  </Page>
)

function mapStateToProps(state, props) {
  let proposal = {}
  let ok = 0
  let no = 0
  let myVote = false
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
    const coinbase = hett.web3h.coinbase()
    if (_.has(proposal, 'voted') && _.has(proposal.voted, coinbase)) {
      myVote = true;
    }
  }
  return {
    proposal,
    ok,
    no,
    myVote,
    congressAddress: state.settings.fields.address,
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    send
  }, dispatch)
  return {
    onSubmit: (address, result, desc) => actions.send(address, 'vote', [props.params.id, result, desc])
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote)
