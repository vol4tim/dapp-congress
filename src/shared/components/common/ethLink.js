import React from 'react'
import _ from 'lodash'
import hett from 'hett'

const EthLink = (props) => {
  let label = props.address
  if (props.small) {
    label = <small>{label}</small>
  }
  if (!_.isEmpty(props.label)) {
    label = <span className={'label label-' + props.label}>{label}</span>
  }
  let type = 'address'
  if (!_.isEmpty(props.type)) {
    type = props.type
  }
  const network = (Number(hett.web3.version.network) === 42) ? 'kovan.' : ''
  return <a href={'https://' + network + 'etherscan.io/' + type + '/' + props.address} style={props.style} target="_blank">{label}</a>
}

export default EthLink
