import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Layout from '../components/common'
import Main from '../components/send'
import { send } from '../../../modules/token/actions'
import { validate } from '../../../utils/helper'

const Container = props => (
  <Layout title={'Execute ' + props.token.info.name} desc={props.token.address}>
    <Main {...props} />
  </Layout>
)

function mapStateToProps(state, props) {
  const address = props.match.params.address;
  const func = props.match.params.func;
  let token = {};
  if (_.has(state.token.items, address)) {
    token = state.token.items[address]
  }
  let form = {}
  const info = _.find(token.abi, { name: func })
  if (info) {
    form = {
      idForm: address + func,
      name: func,
      fields: {}
    }
    _.forEach(info.inputs, (field) => {
      form.fields[field.name] = {
        value: '',
        type: (field.type === 'address') ? 'address' : 'text',
        placeholder: field.type,
        validator: ['required', field.type],
      }
    })
    if (info.payable) {
      form.fields.payable = {
        value: 0,
        type: 'text',
        placeholder: 'the amount to send to with the transaction',
        validator: ['required', 'uint'],
      }
    }
    form.onValidate = data => validate(form.fields, data)
  }
  const network = state.app.network !== 'main' ? state.app.network : ''
  return {
    token,
    form,
    network
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    send
  }, dispatch)
  return {
    onSend: actions.send
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
