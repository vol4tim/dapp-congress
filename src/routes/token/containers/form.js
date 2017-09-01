import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add } from '../components/form';
import { save } from '../../../modules/token/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title={'Add address'}>
    <Form id="token" {...props} onSubmit={props.onSubmit}>
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
    }
  }
  return {
    fields,
    onValidate: form => validate(fields, form)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    save
  }, dispatch)
  return {
    onSubmit: form => actions.save(form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
