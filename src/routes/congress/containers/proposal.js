import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import hett from 'hett'
import { Form } from 'vol4-form'
import Page from './page'
import { Info, Votes, Vote, Execute } from '../components/proposal'
import { vote, execute } from '../../../modules/congress/actions';

const MyVote = (props) => {
  if (props.myVote === false) {
    return <Form id={'vote' + props.proposal.id} fields={props.fieldsVote} onSubmit={props.onSubmitVote}>
      <Vote />
    </Form>
  }
  return <p>Ваш голос уже принят</p>
}

const Proposal = props => (
  <Page title={'Proposal #' + props.proposal.id}>
    <Info proposal={props.proposal} />
    <Votes ok={props.ok} no={props.no} />
    {props.proposal.type !== 'executed' &&
      MyVote(props)
    }
    {props.proposal.type === 'completed' &&
      <Form id={'execute' + props.proposal.id} fields={props.fieldsExecute} onSubmit={props.onSubmitExecute}>
        <Execute />
      </Form>
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
    fieldsVote: [
      {
        name: 'comment',
        value: '',
        type: 'textarea'
      },
      {
        name: 'bool',
        value: ''
      }
    ],
    fieldsExecute: [
      {
        name: 'abi',
        value: '',
        type: 'textarea'
      },
      {
        name: 'action',
        value: '',
        type: 'select'
      },
      {
        name: 'params',
        fields: []
      }
    ],
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    vote,
    execute,
  }, dispatch)
  return {
    onSubmitVote: form => actions.vote(props.params.id, form),
    onSubmitExecute: form => actions.execute(props.params.id, form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposal)
