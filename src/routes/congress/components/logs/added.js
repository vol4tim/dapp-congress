import React from 'react'
import hett from 'hett'
import { timeConverter } from '../../../../utils/helper'

const Added = props => (
  <div className="panel panel-default">
    <div className="panel-heading"><b>#{parseInt(props.result.topics[1].replace(/^0x[0]+/, ''), 16).toString()} ProposalAdded</b> | <span>{timeConverter(props.block.timestamp)}</span></div>
    <div className="panel-body">
      <p>from: {props.tx.from}</p>
      <p>recipient: 0x{props.result.topics[2].replace(/^0x[0]+/, '')}</p>
      <p>data: {hett.web3.toAscii(props.result.data).replace(/[^0-9a-z\s]+/ig, '')}</p>
    </div>
  </div>
)

export default Added
