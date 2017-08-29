import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add } from '../components/form';
import { save } from '../../../modules/token/actions';

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
    }
  }
  return {
    fields,
    onValidate: (form) => {
      const errors = {}
      if (form.address === '') {
        errors.address = 'обязательное поле'
      }
      return errors;
    }
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
