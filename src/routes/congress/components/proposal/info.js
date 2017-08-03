import React from 'react'
import Account from '../../../addressBook/containers/account'
import Toggle from '../../containers/toggle'
import Check from '../../containers/check'
import { timeConverter } from '../../../../utils/helper'

const Info = props => (
  <ul className="list-group">
    <li className="list-group-item">executed: <b>{(props.proposal.executed) ? 'true' : 'false'}</b></li>
    <li className="list-group-item">proposalPassed: <b>{(props.proposal.proposalPassed) ? 'true' : 'false'}</b></li>
    <li className="list-group-item">recipient: <Account address={props.proposal.recipient} /></li>
    <li className="list-group-item">amount: <b>{props.proposal.amount} ETH</b></li>
    <li className="list-group-item">description: <b>{props.proposal.description}</b></li>
    <li className="list-group-item">votingDeadline: <b>{timeConverter(props.proposal.votingDeadline)}</b></li>
    <li className="list-group-item">
      proposalHash: <b>{props.proposal.proposalHash}</b>
      <Toggle btnClass="btn btn-warning btn-xs" styleBtn={{ float: 'right', marginTop: -22 }} btnTitle="check">
        <Check id={props.proposal.id} />
      </Toggle>
    </li>
  </ul>
)

export default Info
