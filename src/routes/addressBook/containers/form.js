import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import { Form } from 'vol4-form'
import { Layout } from '../components/common'
import { Add, Edit } from '../components/form';
import { save } from '../../../modules/addressBook/actions';
import { validate } from '../../../utils/helper';

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
      validator: ['required', 'address'],
    },
    name: {
      value: '',
      type: 'text',
      validator: ['required'],
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
