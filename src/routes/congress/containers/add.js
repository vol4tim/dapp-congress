import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from './page'
import AddProposal from '../components/addProposal';
import { addProposal } from '../../../modules/congress/actions';

const Add = props => (
  <Page title="Add voting">
    <AddProposal onSubmit={props.onSubmit} />
  </Page>
)

function mapStateToProps(state) {
  return {
    congressAddress: state.settings.fields.address,
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    addProposal
  }, dispatch)
  return {
    onSubmit: (address, form) => actions.addProposal(address, form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)
