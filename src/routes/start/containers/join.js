import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Form } from 'vol4-form'
import Page from './page'
import { Join as Fields } from '../components/form'
import { saveField } from '../../../modules/settings/actions';

const Container = props => (
  <Page title="Join congress address">
    <Form id="saveField" {...props}>
      <Fields />
    </Form>
    <hr />
    <Link className="btn btn-default" to="/start/new">Create new congress</Link>
  </Page>
)

function mapStateToProps() {
  return {
    fields: {
      address: {
        value: '',
        type: 'text'
      }
    },
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
    saveField
  }, dispatch)
  return {
    onSubmit: form => actions.saveField('address', form.address)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
