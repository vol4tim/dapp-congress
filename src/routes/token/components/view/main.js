import React from 'react'

const Main = props => (
  <div>
    <p>Hammer: <b>{props.info.hammer}</b></p>
    <p>Owner: <b>{props.info.owner}</b></p>
    <p>Total Supply: <b>{props.info.totalSupply} {props.info.symbol}</b></p>
    <p>Balance: <b>{props.info.myBalance} {props.info.symbol}</b></p>
  </div>
)

export default Main
