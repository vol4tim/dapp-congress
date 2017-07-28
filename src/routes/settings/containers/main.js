import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from './page'
import { Form } from '../components/form';
import { saveAll } from '../../../modules/settings/actions';

const Container = props => (
  <Page title="Settings">
    <Form {...props.settings} onSubmit={props.onSubmit} />
  </Page>
)

function mapStateToProps(state) {
  return {
    settings: state.settings.fields
  }
}
function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    saveAll
  }, dispatch)
  return {
    onSubmit: form => actions.saveAll(form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
