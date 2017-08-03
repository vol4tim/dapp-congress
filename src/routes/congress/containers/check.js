import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'vol4-form'
import Fields from '../components/check';
import { checkProposalCode } from '../../../modules/congress/actions';

const Check = props => (
  <Form {...props} id={'check' + props.idProposal}>
    <Fields />
  </Form>
)

function mapStateToProps(state, props) {
  return {
    fields: [
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
    idProposal: props.id
  }
}
function mapDispatchToProps(dispatch, props) {
  const actions = bindActionCreators({
    checkProposalCode
  }, dispatch)
  return {
    onSubmit: form => actions.checkProposalCode(props.id, form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Check)
