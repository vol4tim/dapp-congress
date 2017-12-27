import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Join as Fields } from '../components/form'
import { saveField } from '../../../modules/settings/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title="Join congress address">
    <Form id="saveField" {...props}>
      <Fields />
    </Form>
    <hr />
    <Link className="btn btn-default" to="/start/new">Create new congress</Link>
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
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    saveField
  }, dispatch)
  return {
    onSubmit: (form) => {
      actions.saveField('address', form.address)
        .then(() => props.history.push('/'))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
