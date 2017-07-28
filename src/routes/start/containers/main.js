import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page from './page'
import { Form } from '../components/form';
import { saveField } from '../../../modules/settings/actions';

const Container = props => (
  <Page title="Set congress address">
    <Form onSubmit={props.onSubmit} />
  </Page>
)

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({
    saveField
  }, dispatch)
  return {
    onSubmit: form => actions.saveField('address', form.address)
  }
}

export default connect(null, mapDispatchToProps)(Container)
