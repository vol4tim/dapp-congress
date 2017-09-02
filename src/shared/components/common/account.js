import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Jdenticon from 'jdenticon'
import EthLink from './ethLink'

const Account = ({ name, address, isToken }) => {
  let type = 'address'
  if (isToken === true) {
    type = 'token'
  }
  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{ float: 'left', width: 40, height: 40, marginRight: 5 }}
        dangerouslySetInnerHTML={{ __html: Jdenticon.toSvg(address, 40) }}
      />
      {name ?
        <div>
          <b>{name}</b><br />
          <EthLink small address={address} type={type} />
        </div>
        :
        <div style={{ paddingTop: 10 }}>
          <EthLink small address={address} type={type} />
        </div>
      }
    </div>
  )
}

function mapStateToProps(state, props) {
  const address = props.address
  let name = props.name || ''
  let isToken = props.isToken || false
  if (name === '') {
    if (_.has(state.addressBook.items, props.address)) {
      name = state.addressBook.items[props.address].name
    } else if (_.has(state.members.items, props.address)) {
      name = state.members.items[props.address].name
    } else if (_.has(state.token.items, props.address)) {
      if (_.has(state.token.items[props.address], 'info')) {
        name = state.token.items[props.address].info.name
      }
      isToken = true
    }
  }
  return {
    address,
    name,
    isToken
  }
}

export default connect(mapStateToProps)(Account)
