import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Form as Fields } from '../components/form'
import { saveAll } from '../../../modules/settings/actions';

const Container = props => (
  <Layout title="Settings">
    <Form id="settings" {...props} onSubmit={props.onSubmit}>
      <Fields />
    </Form>
    <hr />
    <Link className="btn btn-default" to="/start/new">Create new congress</Link>
  </Layout>
)

function mapStateToProps(state) {
  const fields = {}
  _.forEach(state.settings.fields, (value, field) => {
    fields[field] = {
      value,
      type: 'text'
    }
  })
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
    saveAll
  }, dispatch)
  return {
    onSubmit: form => actions.saveAll(form)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
