import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Layout from '../components/common'
import Main from '../components/view';
import { getConstant } from '../../../modules/token/actions'
import { validate } from '../../../utils/helper'

const Container = props => (
  <Layout title={props.token.info.name} desc={props.token.address}>
    <Main {...props} />
  </Layout>
)

function mapStateToProps(state, props) {
  const address = props.match.params.address;
  let token = {};
  if (_.has(state.token.items, address)) {
    token = state.token.items[address]
  }
  const formsConstant = {}
  _.forEach(token.abi, (item) => {
    if (_.has(item, 'constant') && item.constant && item.inputs.length > 0) {
      const idForm = address + item.name;
      formsConstant[idForm] = {
        idForm,
        name: item.name,
        fields: {}
      }
      _.forEach(item.inputs, (field) => {
        formsConstant[idForm].fields[field.name] = {
          value: '',
          type: (field.type === 'address') ? 'address' : 'text',
          placeholder: field.type,
          validator: ['required', field.type],
        }
      })
      formsConstant[idForm].onValidate = form => validate(formsConstant[idForm].fields, form)
    }
  })
  const formsTx = []
  _.forEach(token.abi, (item) => {
    if (_.has(item, 'constant') && item.constant === false) {
      formsTx.push(item.name)
    }
  })
  return {
    token,
    formsConstant: _.values(formsConstant),
    formsTx
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    getConstant
  }, dispatch)
  return {
    onGetConstant: actions.getConstant
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
