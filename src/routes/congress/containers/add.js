import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import AddProposal from '../components/addProposal';
import { addProposal } from '../../../modules/congress/actions';
import { validate } from '../../../utils/helper';

const Add = props => (
  <Layout title="Add voting">
    {props.children}
    <Form {...props} id={'addProposal'}>
      <AddProposal />
    </Form>
  </Layout>
)

function mapStateToProps() {
  const fields = {
    beneficiary: {
      value: '',
      type: 'text',
      validator: ['required', 'address'],
    },
    amount: {
      value: '0',
      type: 'text',
    },
    jobDescription: {
      value: '',
      type: 'text'
    },
    abi: {
      value: '',
      type: 'textarea'
    },
    action: {
      value: '',
      type: 'select'
    },
    params: {
      name: 'params',
      fields: []
    }
  }
  return {
    fields,
    onValidate: form => validate(fields, form)
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addProposal
  }, dispatch)
  return {
    onSubmit: actions.addProposal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)
