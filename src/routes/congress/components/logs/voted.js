import React from 'react'
import { timeConverter } from '../../../../utils/helper'

const Voted = props => (
  <div className="panel panel-default">
    <div className="panel-heading"><b>#{parseInt(props.result.topics[1].replace(/^0x[0]+/, ''), 16).toString()} Voted</b> | <span>{timeConverter(props.block.timestamp)}</span></div>
    <div className="panel-body">
      <p>from: {props.tx.from}</p>
      <p>voter: 0x{props.result.topics[3].replace(/^0x[0]+/, '')}</p>
      <p>bool: {(props.result.topics[2].replace(/^0x[0]+/, '') === '1') ? 'true' : 'false'}</p>
    </div>
  </div>
)

export default Voted
