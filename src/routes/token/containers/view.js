import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Main, Fields } from '../components/view';
import { getConstant } from '../../../modules/token/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title={props.token.info.name} desc={props.token.address}>
    <Main {...props.token} />
    {_.values(props.forms).map((form, index) =>
      <Form
        key={index}
        id={form.idForm}
        {...form}
        onSubmit={data => props.onGetConstant(
          form.idForm,
          props.token.address,
          props.token.type,
          form.name,
          data
        )}
      >
        <Fields />
      </Form>
    )}
  </Layout>
)

function mapStateToProps(state, props) {
  let token = {};
  if (_.has(state.token.items, props.match.params.address)) {
    token = state.token.items[props.match.params.address]
  }
  const forms = {}
  _.forEach(token.abi, (item) => {
    if (_.has(item, 'constant') && item.constant && item.inputs.length > 0) {
      forms[props.match.params.address + item.name] = {
        idForm: props.match.params.address + item.name,
        name: item.name,
        fields: {}
      }
      _.forEach(item.inputs, (field) => {
        forms[props.match.params.address + item.name].fields[field.name] = {
          value: '',
          type: 'text',
          placeholder: field.type,
          validator: ['required', field.type],
        }
      })
      forms[props.match.params.address + item.name].onValidate =
        form => validate(forms[props.match.params.address + item.name].fields, form)
    }
  })
  return {
    token,
    forms
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
