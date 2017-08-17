import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add, Edit } from '../components/form';
import { save } from '../../../modules/addressBook/actions';

const Container = props => (
  <Layout title={(props.isNew) ? 'Add address' : 'Edit address'}>
    <Form id="addressBook" {...props} onSubmit={props.onSubmit}>
      {props.isNew ?
        <Add />
        :
        <Edit />
      }
    </Form>
  </Layout>
)

function mapStateToProps(state, props) {
  const fields = {
    address: {
      value: '',
      type: 'text',
    },
    name: {
      value: '',
      type: 'text',
    }
  }
  let isNew = true;
  if (_.has(state.addressBook.items, props.match.params.address)) {
    isNew = false;
    const item = state.addressBook.items[props.match.params.address]
    fields.address.value = item.address
    fields.name.value = item.name
  }
  return {
    isNew,
    fields,
    onValidate: (form) => {
      const errors = {}
      if (form.address === '') {
        errors.address = 'обязательное поле'
      }
      if (form.name === '') {
        errors.name = 'обязательное поле'
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
