import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Layout from '../components/common'
import Main from '../components/add'
import { save } from '../../../modules/token/actions';
import { validate } from '../../../utils/helper';

const Container = props => (
  <Layout title={'Add address'}>
    <Main {...props} />
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
