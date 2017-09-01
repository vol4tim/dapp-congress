import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add } from '../components/form';
import { addMember } from '../../../modules/members/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title="Add member">
    <Form id="addMember" {...props} onSubmit={props.onSubmit}>
      <Add />
    </Form>
  </Layout>
)

function mapStateToProps() {
  const fields = {
    address: {
      value: '',
      type: 'text',
      validator: ['required', 'address'],
    },
    name: {
      value: '',
      type: 'text',
      validator: ['required'],
    }
  }
  return {
    fields,
    onValidate: form => validate(fields, form)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addMember
  }, dispatch)
  return {
    onSubmit: actions.addMember
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
