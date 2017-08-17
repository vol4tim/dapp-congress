import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import AddProposal from '../components/addProposal';
import { addProposal } from '../../../modules/congress/actions';

const Add = props => (
  <Layout title="Add voting">
    {props.children}
    <Form {...props} id={'addProposal'}>
      <AddProposal />
    </Form>
  </Layout>
)

function mapStateToProps() {
  return {
    fields: [
      {
        name: 'beneficiary',
        value: '',
        type: 'text'
      },
      {
        name: 'amount',
        value: '0',
        type: 'text'
      },
      {
        name: 'jobDescription',
        value: '',
        type: 'text'
      },
      {
        name: 'abi',
        value: '',
        type: 'textarea'
      },
      {
        name: 'action',
        value: '',
        type: 'select'
      },
      {
        name: 'params',
        fields: []
      }
    ],
    onValidate: (form) => {
      const errors = {}
      if (form.beneficiary === '') {
        errors.beneficiary = 'обязательное поле'
      }
      return errors;
    }
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
