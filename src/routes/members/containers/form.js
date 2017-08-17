import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add } from '../components/form';
import { addMember } from '../../../modules/members/actions';

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
    },
    name: {
      value: '',
      type: 'text',
    }
  }
  return {
    fields,
    onValidate: (form) => {
      const errors = {}
      if (form.address === '') {
        errors.address = 'обязательное поле'
      }
      if (form.name === '') {
        errors.name = 'обязательное поле'
      }
      return errors;
    }
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
