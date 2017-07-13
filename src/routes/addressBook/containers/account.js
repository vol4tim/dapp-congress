import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

const Account = props => (
  <div>
    {_.isEmpty(props.account) ?
      <small>{props.address}</small>
      :
      <div>
        {props.account.name}<br />
        <small>{props.account.address}</small>
      </div>
    }
  </div>
)

function mapStateToProps(state, props) {
  let account = {};
  if (_.has(state.addressBook.items, props.address)) {
    account = state.addressBook.items[props.address]
  }
  return {
    address: props.address,
    account
  }
}

export default connect(mapStateToProps)(Account)
